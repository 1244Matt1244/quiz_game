import time
from typing import List, Dict
from rich.progress import Progress
from utils.input_validation import validate_answer
from utils.display_formatter import format_question, show_feedback

class QuizManager:
    def __init__(self):
        self.total_time = 0
        self.progress = Progress()
        
    def run_quiz(self, questions: List[Question]) -> List[Dict]:
        results = []
        with self.progress:
            task = self.progress.add_task("[cyan]Quiz Progress:", total=len(questions))
            
            for idx, question in enumerate(questions):
                self.progress.update(task, advance=1)
                start_time = time.time()
                
                # Show question and get answer
                user_answer = format_question(question, idx+1, len(questions))
                is_correct = validate_answer(question, user_answer)
                
                # Calculate time taken
                q_time = time.time() - start_time
                self.total_time += q_time
                
                # Store result
                results.append({
                    'question': question.text,
                    'correct': is_correct,
                    'time': q_time,
                    'difficulty': question.difficulty
                })
                
                show_feedback(is_correct, q_time)
                
        return results
