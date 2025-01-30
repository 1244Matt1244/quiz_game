class Quiz {
  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timeLeft = 30;
    this.timerId = null;
    this.highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    
    this.init();
  }

  init() {
    this.loadQuestions();
    this.setupEventListeners();
    this.startQuiz();
  }

  loadQuestions() {
    // Sample questions - replace with your actual questions
    this.questions = [
      {
        question: "What is the capital of France?",
        answers: { a: "London", b: "Paris", c: "Berlin", d: "Madrid" },
        correctAnswer: "b"
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: { a: "Venus", b: "Mars", c: "Jupiter", d: "Saturn" },
        correctAnswer: "b"
      }
    ];
    
    document.getElementById('total-questions').textContent = this.questions.length;
  }

  setupEventListeners() {
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAnswer(e));
    });
    
    document.getElementById('restart-btn').addEventListener('click', () => this.restartQuiz());
    document.getElementById('highscores-btn').addEventListener('click', () => this.showHighscores());
  }

  startQuiz() {
    this.showQuestion();
    this.startTimer();
  }

  showQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    
    Object.entries(currentQuestion.answers).forEach(([key, value]) => {
      const btn = document.querySelector(`[data-answer="${key}"]`);
      btn.querySelector('.answer-text').textContent = value;
    });
    
    document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
    this.updateProgress();
  }

  startTimer() {
    this.timeLeft = 30;
    document.getElementById('time').textContent = this.timeLeft;
    
    this.timerId = setInterval(() => {
      this.timeLeft--;
      document.getElementById('time').textContent = this.timeLeft;
      document.querySelector('.time-remaining').style.width = 
        `${(this.timeLeft / 30) * 100}%`;

      if (this.timeLeft <= 0) {
        this.handleTimeOut();
      }
    }, 1000);
  }

  handleAnswer(e) {
    const selectedAnswer = e.currentTarget.dataset.answer;
    const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
    
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.classList.add(btn.dataset.answer === correctAnswer ? 'correct' : 'wrong');
      btn.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {
      this.score += this.timeLeft;
      document.getElementById('current-score').textContent = `Score: ${this.score}`;
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.classList.remove('correct', 'wrong');
      btn.disabled = false;
    });

    if (this.currentQuestionIndex < this.questions.length) {
      this.showQuestion();
      this.resetTimer();
    } else {
      this.endQuiz();
    }
  }

  handleTimeOut() {
    clearInterval(this.timerId);
    this.nextQuestion();
  }

  resetTimer() {
    clearInterval(this.timerId);
    this.startTimer();
  }

  endQuiz() {
    clearInterval(this.timerId);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = this.score;
    
    this.saveHighscore();
  }

  saveHighscore() {
    const name = prompt('Enter your name for the highscore board:');
    if (name) {
      this.highscores.push({ name, score: this.score });
      this.highscores.sort((a, b) => b.score - a.score);
      this.highscores = this.highscores.slice(0, 10);
      localStorage.setItem('highscores', JSON.stringify(this.highscores));
      this.updateHighscoresList();
    }
  }

  showHighscores() {
    document.getElementById('highscores-modal').showModal();
    this.updateHighscoresList();
  }

  updateHighscoresList() {
    const list = document.getElementById('highscores-list');
    list.innerHTML = this.highscores
      .map((entry, index) => `
        <li>
          <span>${index + 1}. ${entry.name}</span>
          <span>${entry.score}</span>
        </li>
      `).join('');
  }

  updateProgress() {
    const progress = (this.currentQuestionIndex / this.questions.length) * 100;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timeLeft = 30;
    document.getElementById('current-score').textContent = 'Score: 0';
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('results-screen').classList.add('hidden');
    this.startQuiz();
  }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new Quiz();
});

function closeHighscores() {
  document.getElementById('highscores-modal').close();
}
