import unittest

from backend.engine import Reel, infer_interest, score_reel


class EngineTests(unittest.TestCase):
    def test_trap_scenario_infers_software_engineering(self):
        profile = infer_interest([
            {"title": "Java", "transcript": "Java", "context": "software engineer laptop", "completion": 0.96},
            {"title": "Spring Boot APIs", "transcript": "backend API design", "context": "software engineer", "completion": 0.90},
        ])
        self.assertEqual(profile["interests"][0]["name"], "Software Engineering")

    def test_hype_penalty_keeps_clickbait_below_useful_reel(self):
        profile = {"interests": [{"name": "Software Engineering", "score": 0.82}], "last_category": "AI & Machine Learning"}
        clickbait = Reel("trap", "10 AI Tools Every Developer Needs", "", "AI & Machine Learning", "Beginner", "", "", ("java", "ai tools", "developer"), .96, .95, "pink")
        useful = Reel("useful", "Building an Event Pipeline", "", "Software Engineering", "Advanced", "08:00", "backend API production", ("java", "backend", "kafka"), .91, .28, "mint")
        self.assertLess(score_reel(clickbait, profile)["score"], score_reel(useful, profile)["score"])
        self.assertEqual(score_reel(clickbait, profile)["formula"]["hype_penalty"], 0.14)


if __name__ == "__main__":
    unittest.main()
