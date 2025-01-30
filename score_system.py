import sqlite3
from datetime import datetime
from typing import List, Dict

class ScoreTracker:
    def __init__(self):
        self.conn = sqlite3.connect('scores.db')
        self._init_db()
        
    def _init_db(self):
        self.conn.execute('''CREATE TABLE IF NOT EXISTS scores
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
              date TEXT NOT NULL,
              score INTEGER NOT NULL,
              duration REAL NOT NULL)''')
    
    def calculate_score(self, results: List[Dict], total_time: float) -> int:
        base = sum(10 for r in results if r['correct'])
        time_bonus = max(0, (300 - total_time) // 10)
        difficulty_bonus = sum(r['difficulty'] * 2 for r in results if r['correct'])
        return base + time_bonus + difficulty_bonus
    
    def save_score(self, score: int):
        self.conn.execute(
            "INSERT INTO scores (date, score, duration) VALUES (?, ?, ?)",
            (datetime.now().isoformat(), score, self.total_time)
        )
        self.conn.commit()
