"""Local semantic recommendation engine for the TechScroll AI MVP.

The scoring interface is intentionally small so a real embedding or LLM provider
can replace the heuristics later without changing the API contract.
"""

from __future__ import annotations

import re
from collections import defaultdict
from dataclasses import dataclass
from typing import Iterable


INTERESTS = [
    "Software Engineering",
    "AI & Machine Learning",
    "Product Design",
    "Data & Analytics",
    "Cybersecurity",
]

SIGNAL_MAP = {
    "java": {"Software Engineering": 0.24},
    "software engineer": {"Software Engineering": 0.52},
    "developer": {"Software Engineering": 0.28},
    "backend": {"Software Engineering": 0.36},
    "api": {"Software Engineering": 0.28},
    "spring boot": {"Software Engineering": 0.42},
    "kafka": {"Software Engineering": 0.30, "Data & Analytics": 0.16},
    "event-driven": {"Software Engineering": 0.34},
    "laptop": {"Software Engineering": 0.10, "Product Design": 0.05},
    "python": {"Software Engineering": 0.18, "AI & Machine Learning": 0.16},
    "machine learning": {"AI & Machine Learning": 0.55},
    "llm": {"AI & Machine Learning": 0.40},
    "model": {"AI & Machine Learning": 0.20},
    "dashboard": {"Data & Analytics": 0.25, "Product Design": 0.12},
    "privacy": {"Cybersecurity": 0.42},
    "security": {"Cybersecurity": 0.44},
    "figma": {"Product Design": 0.44},
}


@dataclass(frozen=True)
class Reel:
    id: str
    title: str
    creator: str
    category: str
    difficulty: str
    duration: str
    description: str
    tags: tuple[str, ...]
    engagement: float
    hype: float
    color: str


def tokenize(value: str) -> set[str]:
    return set(re.findall(r"[a-z0-9+#.-]+", value.lower()))


def infer_interest(interactions: Iterable[dict]) -> dict:
    """Infer broad interests from the whole interaction, not one keyword."""
    scores = defaultdict(float)
    evidence: list[dict] = []
    for interaction in interactions:
        text = " ".join(
            str(interaction.get(key, ""))
            for key in ("title", "transcript", "context", "tags")
        ).lower()
        duration = float(interaction.get("completion", interaction.get("watch_ratio", 0.6)))
        liked = 1.12 if interaction.get("liked") else 1.0
        matched = []
        for phrase, interest_weights in SIGNAL_MAP.items():
            if phrase in text:
                matched.append(phrase)
                for interest, weight in interest_weights.items():
                    scores[interest] += weight * max(0.25, duration) * liked
        if matched:
            evidence.append({"source": interaction.get("title", "Interaction"), "signals": matched})

    # A multi-signal context gets a confidence lift: Java + role + device is
    # meaningfully different from simply matching the word "Java".
    joined = " ".join(str(item) for interaction in interactions for item in interaction.values()).lower()
    if "java" in joined and "software engineer" in joined and "laptop" in joined:
        scores["Software Engineering"] += 0.36

    total = sum(scores.values()) or 1
    ranked = sorted(
        ({"name": name, "score": round(min(0.98, value / total + (0.08 if name == "Software Engineering" else 0)), 2)} for name, value in scores.items()),
        key=lambda item: item["score"],
        reverse=True,
    )
    for name in INTERESTS:
        if not any(item["name"] == name for item in ranked):
            ranked.append({"name": name, "score": 0.04})
    confidence = min(0.98, 0.56 + len(evidence) * 0.07 + (0.12 if len(ranked) and ranked[0]["score"] > 0.55 else 0))
    return {
        "interests": ranked[:5],
        "confidence": round(confidence, 2),
        "evidence": evidence,
        "insight": "You are not just curious about Java — you are following the systems that make software scale.",
    }


def score_reel(reel: Reel, profile: dict, *, repeated: bool = False) -> dict:
    """Score a reel using Interest + Career + Engagement + Diversity + Difficulty - Hype - Repetition."""
    profile_lookup = {item["name"]: float(item["score"]) for item in profile.get("interests", [])}
    searchable = " ".join((reel.title, reel.description, reel.category, *reel.tags)).lower()
    tokens = tokenize(searchable)
    interest = 0.0
    if reel.category in profile_lookup:
        interest += profile_lookup[reel.category]
    if "software" in searchable or "developer" in searchable or "backend" in searchable:
        interest += profile_lookup.get("Software Engineering", 0) * 0.7
    if "ai" in searchable or "llm" in searchable or "model" in searchable:
        interest += profile_lookup.get("AI & Machine Learning", 0) * 0.55
    interest = min(1.0, interest)
    career = 0.90 if any(word in searchable for word in ("career", "api", "backend", "production", "engineer")) else 0.42
    engagement = max(0.0, min(1.0, reel.engagement))
    diversity = 0.84 if reel.category != profile.get("last_category") else 0.48
    difficulty = {"Beginner": 0.55, "Intermediate": 0.78, "Advanced": 0.88}.get(reel.difficulty, 0.6)
    hype_penalty = reel.hype
    repetition_penalty = 0.8 if repeated else 0.0
    raw = interest + career + engagement + diversity + difficulty - (0.15 * hype_penalty) - repetition_penalty
    return {
        "reel_id": reel.id,
        "score": round(raw, 3),
        "formula": {
            "interest": round(interest, 2),
            "career": round(career, 2),
            "engagement": round(engagement, 2),
            "diversity": round(diversity, 2),
            "difficulty": round(difficulty, 2),
            "hype_penalty": round(0.15 * hype_penalty, 2),
            "repetition_penalty": round(repetition_penalty, 2),
        },
        "reason": "Semantic match to your software-building signals, with a practical next step for your current level.",
    }
