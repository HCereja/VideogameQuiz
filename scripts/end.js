const MAX_HIGHSCORES = 5;

const username = document.getElementById("username");
const saveBtn = document.getElementById("save-score");
const finalScore = document.getElementById("final-score");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highscores")) || [];

username.addEventListener("keyup", () => {
  saveBtn.disabled = !username.value;
});

finalScore.innerText = mostRecentScore;

saveHighscore = (ev) => {
  ev.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGHSCORES);

  localStorage.setItem("highscores", JSON.stringify(highScores));
  localStorage.setItem("mostRecentScore", 0);
  window.location.assign("/");
};
