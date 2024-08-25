// Quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        a: "New York",
        b: "London",
        c: "Paris",
        d: "Dubai",
        correct: "c"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        a: "Ernest Hemingway",
        b: "Harper Lee",
        c: "F. Scott Fitzgerald",
        d: "Mark Twain",
        correct: "b"
    },
    // Add more questions as needed
];

// Current question index
let currentQuestion = 0;

// User's score
let score = 0;

// Timer
let timer = 30;

// High scores
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Start the quiz
startQuiz();

function startQuiz() {
    // Shuffle the questions
    quizData.sort(() => Math.random() - 0.5);

    // Display the first question
    showQuestion();

    // Start the timer
    setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = `Time remaining: ${timer}s`;

        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('question').textContent = question.question;
    document.getElementById('a').textContent = question.a;
    document.getElementById('b').textContent = question.b;
    document.getElementById('c').textContent = question.c;
    document.getElementById('d').textContent = question.d;
}

function chooseAnswer(answer) {
    if (answer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    // Stop the timer
    clearInterval(timer);

    // Check if this score is a new high score
    if (score > Math.max(...highScores)) {
        highScores.push(score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }

    // Show the final score
    document.getElementById('quiz').innerHTML = `<h2>Your score: ${score}/${quizData.length}</h2><h2>High score: ${Math.max(...highScores)}</h2>`;
}
