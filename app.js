const quizdata = [
  {
    question: "How to declare a variable in JS?",
    options: ["var", "let", "const", "all of the above"],
    correct: 3,
  },
  {
    question: "What is a boolean value?",
    options: ["True/False", "numbers", "yes/no"],
    correct: 0,
  },
  {
    question: "Which JS operator is deeply equal too?",
    options: ["=", "==", "==="],
    correct: 2,
  },
  {
    question: "What will !true return in console? ",
    options: ["true", "false"],
    correct: 1,
  },
];

let questionIndex = 0;
let score = 0;
let timer;
const MAXTIME = 60;
let timeRemaining = MAXTIME;

let startBtn = document.getElementById("start-btn");
let quizContainer = document.getElementById("quiz-container");
let questionEl = document.getElementById("question");
let optionsContainer = document.getElementById("options-container");
let optionsUl = document.getElementById("optionsUl");
let feedbackEl = document.getElementById("feedback");
let endContainer = document.getElementById("end-container");
let scoreEl = document.getElementById("score");
let initialsInput = document.getElementById("initials");
let saveBtn = document.getElementById("save-btn");
let timerEl = document.getElementById("timer");

startBtn.addEventListener("click", startQuiz);
saveBtn.addEventListener("click", saveScore);

function startQuiz() {
  startBtn.style.display = "none";
  quizContainer.style.display = "block";
  loadNextQuestion();
  startTimer();
}

function loadNextQuestion() {
  const currentQuestion = quizdata[questionIndex];
  resetOptions();
  displayQuestion(currentQuestion);
}

function displayQuestion(question) {
  questionEl.textContent = question.question;
  question.options.forEach((option, index) => {
    console.log(option);
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index));
    optionsContainer.appendChild(optionsUl);
    optionsUl.appendChild(button);
  });
}

function resetOptions() {
  while (optionsUl.firstChild) {
    optionsUl.removeChild(optionsUl.firstChild);
  }
}

function checkAnswer(selectedIndex) {
  const currentQuestion = quizdata[questionIndex];
  if (selectedIndex === currentQuestion.correct) {
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    feedbackEl.textContent = "Incorrect!";
    timeRemaining -= 10;
  }

  questionIndex++;

  if (questionIndex < quizdata.length) {
    loadNextQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timer = setInterval(function () {
    if (timeRemaining > 0) {
      timeRemaining--;
      timerEl.textContent = timeRemaining;
    } else {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  quizContainer.style.display = "none";
  endContainer.style.display = "grid";
  scoreEl.textContent = score;
}

function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    alert(`Score saved for ${initials}: ${score}`);
  } else {
    alert("Please enter your initials.");
    return;
  }

  let existingScores = JSON.parse(localStorage.getItem("usrscores")) || [];
  const newScore = { initials, score };
  existingScores.push(newScore);
  localStorage.setItem("usrscores", JSON.stringify(existingScores));
  window.location.href = "highscores.html";
}
