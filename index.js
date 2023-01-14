// dom elements
const checks = document.querySelectorAll('.check')
const gameOver = document.querySelector('.gameOver')
const gameOverText = document.querySelector('.gameOverWrapper p')
const playAgain = document.querySelector('.gameOverWrapper button')
const scores = document.querySelectorAll('.score span')
const turn = document.querySelector('.turn span')
const clearRecords = document.querySelector('.clearRecords')

// const sounds
const gameOverSound = new Audio('./sounds/gameOver.wav')
const gameWinSound = new Audio('./sounds/gameWin.wav')
const checkSound = new Audio('./sounds/check.wav')

// ranomize numbers
let randomPlayer = Math.round(Math.random())

// essential variables
let playerScore = localStorage.getItem('player-score')
let computerScore = localStorage.getItem('computer-score')
let checksArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let currentPlayer = randomPlayer;
let playing = true;
let someoneWon = false;

// scores
scores[0].innerText = playerScore || 0
scores[1].innerText = computerScore || 0

// win possiblities
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8]
]

// logic
function playerTurn() {
    checks.forEach((check, index) => {
        check.addEventListener('click', (e) => {
            if (playing) {
                if (!e.target.innerText && currentPlayer === 0) {
                    e.target.innerText = 'X'
                    e.target.style.color = 'blue'
                    checksArray = checksArray.filter(elem => elem !== index)
                    checkSound.play()
                    checkWin()
                    currentPlayer = 1;
                    computerTurn()
                }
            }
        })
    })
}

// playing as computer
function computerTurn() {
    if (currentPlayer === 1 && checksArray.length > 0 && playing) {
        turn.textContent = 'Computer'
        setTimeout(() => {
            const randomElement = Math.floor(Math.random() * checksArray.length)
            checks[checksArray[randomElement]].innerText = 'O'
            checks[checksArray[randomElement]].style.color = 'red'
            checksArray = checksArray.filter(elem => elem !== checksArray[randomElement])
            turn.textContent = 'Your'
            checkSound.play()
            checkWin()
            currentPlayer = 0
        }, 1000)

    }
}
computerTurn()
playerTurn()


// check win
function checkWin() {
    for (let winCombo in winningCombos) {
        if (checks[winningCombos[winCombo][0]].innerText == 'O' && checks[winningCombos[winCombo][1]].innerText == 'O' && checks[winningCombos[winCombo][2]].innerText == 'O') {
            gameOverText.innerText = 'Oops! You Lost.'
            gameOver.style.display = 'flex'
            playing = false
            localStorage.setItem('computer-score', +computerScore + 1)
            gameOverSound.play()
            someoneWon = true;
        }
        else if (checks[winningCombos[winCombo][0]].innerText == 'X' && checks[winningCombos[winCombo][1]].innerText == 'X' && checks[winningCombos[winCombo][2]].innerText == 'X') {
            gameOverText.innerText = 'Congratulations! You Win.'
            gameOver.style.display = 'flex'
            playing = false
            localStorage.setItem('player-score', +playerScore + 1)
            gameWinSound.play()
            someoneWon = true
        }
        else if (checksArray.length <= 0 && !someoneWon) {
            gameOverText.innerText = 'Game Tied. Play Again.'
            gameOver.style.display = 'flex'
            gameOverSound.play()
            playing = false
        }
    }
}

playAgain.addEventListener('click', () => {
    checksArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    playing = true;
    playerScore = localStorage.getItem('player-score')
    computerScore = localStorage.getItem('computer-score')
    checks.forEach(check => check.innerText = '')
    gameOver.style.display = 'none'
    scores[0].innerText = playerScore || 0
    scores[1].innerText = computerScore || 0
    playerTurn()
    computerTurn()
})

// clear records
clearRecords.addEventListener('click', () => {
    localStorage.clear()
    window.location.href = '/'
})