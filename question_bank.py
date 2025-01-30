import json
import random
from pathlib import Path
from typing import List, Dict

class Question:
    def __init__(self, q_data: Dict):
        self.type = q_data['type']
        self.text = q_data['text']
        self.options = q_data.get('options', [])
        self.answer = q_data['answer']
        self.difficulty = q_data['difficulty']
        self.category = q_data['category']

class QuestionBank:
    def __init__(self, questions_file: str):
        self.questions_file = Path(questions_file)
        
    def load_questions(self, num_questions: int = 10) -> List[Question]:
        with open(self.questions_file) as f:
            all_questions = json.load(f)['questions']
            selected = random.sample(all_questions, min(num_questions, len(all_questions)))
            return [Question(q) for q in selected]
