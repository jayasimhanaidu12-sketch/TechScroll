from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .engine import Reel, infer_interest, score_reel


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "techscroll.db"

app = FastAPI(title="TechScroll AI API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


SEED_REELS = [
    Reel("reel-01", "Building a Real-Time Event Pipeline with Kafka", "Mina Patel", "Software Engineering", "Advanced", "08:42", "Move from a Java event to a production-ready stream that can keep up with your product.", ("java", "backend", "kafka", "event-driven", "production"), .91, .28, "mint"),
    Reel("reel-02", "10 AI Tools Every Developer Needs", "The Stack Daily", "AI & Machine Learning", "Beginner", "05:18", "A rapid-fire list of the loudest tools in the feed.", ("java", "ai tools", "developer", "trending"), .96, .95, "pink"),
    Reel("reel-03", "Spring Boot APIs That Don't Break at Scale", "Arjun Rao", "Software Engineering", "Intermediate", "11:26", "A clean mental model for boundaries, observability, and resilient Java services.", ("java", "spring boot", "api", "backend"), .88, .34, "blue"),
    Reel("reel-04", "How I Think About ML Systems", "Nora Chen", "AI & Machine Learning", "Advanced", "09:04", "The system design layer behind reliable machine learning products.", ("python", "machine learning", "model"), .83, .43, "violet"),
    Reel("reel-05", "A Designer's Guide to Developer Tools", "Lena Okafor", "Product Design", "Intermediate", "06:52", "Why the best technical products feel calm, legible, and fast.", ("figma", "developer tools", "product"), .79, .41, "amber"),
    Reel("reel-06", "Reading a Dashboard Like an Engineer", "Data With Dan", "Data & Analytics", "Beginner", "04:36", "Turn metrics into better engineering decisions with three simple questions.", ("dashboard", "metrics", "analytics"), .77, .26, "cyan"),
    Reel("reel-07", "Threat Modeling Your First API", "Sana Ali", "Cybersecurity", "Intermediate", "07:31", "A practical threat-modeling walkthrough for builders shipping their first API.", ("security", "api", "privacy"), .75, .21, "red"),
    Reel("reel-08", "The Laptop Setup That Survives a Launch", "Build Mode", "Software Engineering", "Beginner", "03:58", "Small workflow changes that keep your focus intact on a long build day.", ("laptop", "developer", "workflow"), .72, .32, "lime"),
    Reel("reel-09", "What Actually Happens When You Type a URL", "Packet Walk", "Networking", "Beginner", "05:44", "Follow a browser request from DNS lookup to the server response in plain language.", ("dns", "http", "web", "networking"), .86, .24, "cyan"),
    Reel("reel-10", "Docker in 60 Seconds: Images, Containers, Ports", "Ship It", "DevOps & Cloud", "Beginner", "04:12", "The mental model you need before running your first service in a container.", ("docker", "containers", "devops", "cloud"), .89, .29, "blue"),
    Reel("reel-11", "Build a RAG App Without the Buzzwords", "Nora Chen", "AI & Machine Learning", "Intermediate", "10:18", "Embeddings, retrieval, and generation explained through one useful product flow.", ("rag", "embeddings", "llm", "python"), .90, .46, "violet"),
    Reel("reel-12", "Git Branches Without the Confusion", "Commit Club", "Software Engineering", "Beginner", "03:27", "A visual walkthrough of branches, merges, and the safest way to collaborate.", ("git", "github", "collaboration", "developer"), .82, .18, "mint"),
    Reel("reel-13", "SQL Joins Explained with One Coffee Shop", "Data With Dan", "Data & Analytics", "Beginner", "06:06", "Understand inner, left, and full joins using a story you will remember.", ("sql", "database", "data", "analytics"), .87, .20, "amber"),
    Reel("reel-14", "React State: The Part Beginners Miss", "Frontend Fieldnotes", "Frontend Engineering", "Intermediate", "08:11", "Learn how state flows through a component tree and why renders happen.", ("react", "javascript", "frontend", "state"), .84, .37, "pink"),
    Reel("reel-15", "How Public-Key Cryptography Works", "Secure By Design", "Cybersecurity", "Intermediate", "07:02", "The lock-and-key idea behind HTTPS, signatures, and secure communication.", ("cryptography", "https", "security", "encryption"), .81, .22, "red"),
    Reel("reel-16", "The 5-Minute System Design Interview", "Mina Patel", "Software Engineering", "Advanced", "09:40", "A repeatable way to break down scale, storage, traffic, and trade-offs.", ("system design", "architecture", "scale", "interview"), .88, .33, "lime"),
    Reel("reel-17", "Edge Computing: Why the Server Moved Closer", "Cloud Atlas", "DevOps & Cloud", "Intermediate", "05:51", "See how latency, caching, and distributed systems shape modern apps.", ("edge", "cloud", "latency", "distributed"), .78, .27, "blue"),
    Reel("reel-18", "Computer Vision Is More Than Image Labels", "Model Room", "AI & Machine Learning", "Advanced", "08:35", "A friendly tour from pixels to detection, segmentation, and visual reasoning.", ("computer vision", "python", "deep learning", "models"), .80, .39, "violet"),
    Reel("reel-19", "Design Tokens: The Secret Behind Consistent UIs", "Lena Okafor", "Product Design", "Intermediate", "06:28", "Turn color, type, and spacing decisions into a system developers can ship.", ("design systems", "tokens", "figma", "ui"), .76, .25, "amber"),
    Reel("reel-20", "The Internet of Things, Without the Hype", "Signal Lab", "Emerging Tech", "Intermediate", "07:48", "Sensors, protocols, and the real engineering constraints behind connected devices.", ("iot", "sensors", "hardware", "embedded"), .73, .31, "cyan"),
]


class AnalyzeRequest(BaseModel):
    student_id: str = "alex"
    interactions: list[dict[str, Any]] = Field(default_factory=list)


class RecommendRequest(BaseModel):
    student_id: str = "alex"
    profile: dict[str, Any] = Field(default_factory=dict)


class FeedbackRequest(BaseModel):
    student_id: str = "alex"
    reel_id: str
    feedback: str


def connect() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    connection = connect()
    connection.executescript("""
        CREATE TABLE IF NOT EXISTS students (id TEXT PRIMARY KEY, name TEXT NOT NULL, role TEXT, streak INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS reels (id TEXT PRIMARY KEY, title TEXT, creator TEXT, category TEXT, difficulty TEXT, duration TEXT, description TEXT, tags TEXT, engagement REAL, hype REAL, color TEXT);
        CREATE TABLE IF NOT EXISTS interactions (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id TEXT, reel_id TEXT, title TEXT, transcript TEXT, context TEXT, completion REAL, liked INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS interest_profiles (student_id TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS recommendations (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id TEXT, reel_id TEXT, score REAL, reason TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    """)
    connection.execute("INSERT OR IGNORE INTO students (id, name, role, streak) VALUES ('alex', 'Alex Morgan', 'Software Engineer', 7)")
    for reel in SEED_REELS:
        connection.execute("""INSERT OR IGNORE INTO reels (id,title,creator,category,difficulty,duration,description,tags,engagement,hype,color)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)""", (reel.id, reel.title, reel.creator, reel.category, reel.difficulty, reel.duration, reel.description, json.dumps(reel.tags), reel.engagement, reel.hype, reel.color))
    seed_interactions = [
        ("reel-03", "Spring Boot APIs That Don't Break at Scale", "Java services, Spring Boot, and resilient API patterns", "software engineer laptop", .95, 1),
        ("reel-08", "The Laptop Setup That Survives a Launch", "developer workflow and focus for a build day", "software engineer laptop", .82, 1),
        ("reel-01", "Building a Real-Time Event Pipeline with Kafka", "Java backend event-driven systems", "software engineer laptop", .88, 1),
    ]
    for reel_id, title, transcript, context, completion, liked in seed_interactions:
        connection.execute("INSERT OR IGNORE INTO interactions (student_id,reel_id,title,transcript,context,completion,liked) SELECT 'alex',?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM interactions WHERE student_id='alex' AND reel_id=?)", (reel_id, title, transcript, context, completion, liked, reel_id))
    interactions = [dict(row) for row in connection.execute("SELECT title, transcript, context, completion, liked FROM interactions WHERE student_id='alex'").fetchall()]
    profile = infer_interest(interactions)
    connection.execute("INSERT OR REPLACE INTO interest_profiles (student_id,payload) VALUES (?,?)", ("alex", json.dumps(profile)))
    connection.commit()
    connection.close()


def reel_from_row(row: sqlite3.Row) -> Reel:
    return Reel(row["id"], row["title"], row["creator"], row["category"], row["difficulty"], row["duration"], row["description"], tuple(json.loads(row["tags"])), row["engagement"], row["hype"], row["color"])


def get_profile(student_id: str = "alex") -> dict:
    row = connect().execute("SELECT payload FROM interest_profiles WHERE student_id=?", (student_id,)).fetchone()
    return json.loads(row["payload"]) if row else infer_interest([])


@app.on_event("startup")
def startup() -> None:
    init_db()


@app.get("/api/health")
def health() -> dict:
    init_db()
    return {"status": "ok", "mode": "demo", "database": "sqlite"}


@app.get("/api/dashboard")
def dashboard(student_id: str = "alex") -> dict:
    init_db()
    connection = connect()
    student = connection.execute("SELECT * FROM students WHERE id=?", (student_id,)).fetchone()
    if not student:
        raise HTTPException(404, "Student not found")
    profile = get_profile(student_id)
    watched = [dict(row) for row in connection.execute("SELECT * FROM interactions WHERE student_id=? ORDER BY id DESC", (student_id,)).fetchall()]
    return {"student": dict(student), "profile": profile, "watched": watched}


@app.get("/api/reels")
def reels(limit: int = 20) -> dict:
    """Return the technology reel catalog for the feed/library surface."""
    init_db()
    safe_limit = min(max(limit, 1), 20)
    connection = connect()
    rows = connection.execute("SELECT * FROM reels ORDER BY id LIMIT ?", (safe_limit,)).fetchall()
    connection.close()
    return {"reels": [{**dict(row), "tags": json.loads(row["tags"])} for row in rows], "count": len(rows)}


@app.post("/api/analyze")
def analyze(request: AnalyzeRequest) -> dict:
    init_db()
    profile = infer_interest(request.interactions)
    connection = connect()
    connection.execute("INSERT OR REPLACE INTO interest_profiles (student_id,payload) VALUES (?,?)", (request.student_id, json.dumps(profile)))
    connection.commit()
    connection.close()
    return profile


@app.post("/api/recommend")
def recommend(request: RecommendRequest) -> dict:
    init_db()
    profile = request.profile or get_profile(request.student_id)
    connection = connect()
    rows = connection.execute("SELECT * FROM reels").fetchall()
    scored = []
    for row in rows:
        reel = reel_from_row(row)
        scored.append({**dict(row), "tags": json.loads(row["tags"]), **score_reel(reel, profile)})
    scored.sort(key=lambda item: item["score"], reverse=True)
    top = scored[0]
    connection.execute("INSERT INTO recommendations (student_id,reel_id,score,reason) VALUES (?,?,?,?)", (request.student_id, top["id"], top["score"], top["reason"]))
    connection.commit()
    connection.close()
    return {"recommendation": top, "alternatives": scored[1:4], "formula_label": "Interest + Career + Engagement + Diversity + Difficulty − Hype − Repetition"}


@app.post("/api/feedback")
def feedback(request: FeedbackRequest) -> dict:
    init_db()
    if request.feedback not in {"up", "down", "save"}:
        raise HTTPException(400, "feedback must be up, down, or save")
    connection = connect()
    reel = connection.execute("SELECT title, category FROM reels WHERE id=?", (request.reel_id,)).fetchone()
    if not reel:
        raise HTTPException(404, "Reel not found")
    return {"status": "recorded", "feedback": request.feedback, "message": "Signal added. Your next recommendation will adapt."}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
