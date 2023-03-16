//Constantes
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

const question = document.getElementById("question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.getElementById("progress-text");
const progressBarCompletion = document.getElementById(
  "progress-bar-completion"
);
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

//Variáveis base
let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((question) => {
      const formattedQuestion = {
        question: question.question,
      };
      const answerChoices = [...question.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        question.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion[`choice${index + 1}`] = choice;
      });
      return formattedQuestion;
    });
    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") incrementScore(CORRECT_BONUS);
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Funções
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  //Finalizar jogo
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarCompletion.style.width = `${
    (questionCounter / MAX_QUESTIONS) * 100
  }%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
};

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
