const highscoresList = document.getElementById("highscores-list");

const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

highscoresList.innerHTML = highscores
  .map((score, index) => {
    return `<li class="highscore">${index + 1}) ${score.name} - ${
      score.score
    }</li>`;
  })
  .join("");
