from rich.console import Console
from quiz_manager import QuizManager
from question_bank import QuestionBank
from score_system import ScoreTracker
from utils.display_formatter import display_header, display_results

console = Console()

def main():
    display_header("Python Quiz Master")
    
    # Initialize components
    question_bank = QuestionBank('data/questions.json')
    score_tracker = ScoreTracker()
    quiz_manager = QuizManager()
    
    # Start quiz session
    questions = question_bank.load_questions()
    results = quiz_manager.run_quiz(questions)
    
    # Calculate and display score
    final_score = score_tracker.calculate_score(results, quiz_manager.total_time)
    display_results(final_score, len(results))
    
    # Save score
    score_tracker.save_score(final_score)

if __name__ == "__main__":
    main()
