const backButton = document.getElementById('home-btn')
backButton.addEventListener('click', goHome)

function displayScores() {
    const userData = JSON.parse(localStorage.getItem('usrscores'));
    console.log(userData)
    const scoresDiv = document.getElementById('previous-scores')
    const scoresUl = document.createElement('ul')
    scoresDiv.appendChild(scoresUl)
    userData.forEach(score => {
        const scoresEl = document.createElement('li')
        const info = score.initials + ',' + score.score
        scoresEl.textContent = info
        scoresDiv.appendChild(scoresEl)
    });
}

function goHome() {
    window.location.href = 'index.html'
}

displayScores()