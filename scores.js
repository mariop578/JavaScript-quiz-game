const backButton = document.getElementById("home-btn");
backButton.addEventListener("click", goHome);

function displayScores() {
  //   // Filter for top 3 results and double results
  const userData = JSON.parse(localStorage.getItem("usrscores"));
  const sortedScores = userData.sort((a, b) => b.score - a.score);
  const topThree = sortedScores.slice(0, 3);
  const scoresDiv = document.getElementById("previous-scores");
  const scoresUl = document.createElement("ul");
  scoresDiv.appendChild(scoresUl);
  topThree.forEach((score) => {
    const scoresEl = document.createElement("li");
    const info = score.initials + "," + score.score;
    scoresEl.textContent = info;
    scoresDiv.appendChild(scoresEl);
  });
}

function goHome() {
  window.location.href = "index.html";
}

displayScores();
