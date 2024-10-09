const gridContainer = document.querySelector('.grid-container');
const gridSize = { rows: 10, cols: 12 };
const totalCells = gridSize.rows * gridSize.cols;
let playerPos = 13;
let balls = [];
let playerBalls = 0

for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gridContainer.appendChild(cell);
}

function checkCell(pos) {
    if ((pos >= 0 && pos < 5) || (pos > 5 && pos <= 11) || (pos >= 108 && pos < 115) || (pos > 115 && pos <= 119) ||
        (pos % 12 == 0 && pos != 36) || (pos % 12 == 11 && pos != 35))
        return false;
    return true;
}

function createPlayer() {
    const player = document.createElement('img');
    player.src = '../img/gamer.png';
    player.classList.add('player');
    gridContainer.children[playerPos].appendChild(player);
}

createPlayer();

function createBalls() {
    if (balls.length < 83) {
        setTimeout(() => {
            let pos = Math.floor(Math.random() * totalCells);
            while (pos == playerPos || balls.includes(pos) || !checkCell(pos)) {
                pos = Math.floor(Math.random() * totalCells);
            }
            console.log(pos);
            let newBall = document.createElement('img');
            newBall.src = '../img/ball.png';
            newBall.classList.add('ball');
            gridContainer.children[pos].appendChild(newBall);
            balls.push(pos);
            createBalls();
        }, 100)
    }
}
createBalls();

function updatePlayerPos(currentPos) {
    if (balls.includes(currentPos)) {
        balls = balls.filter(pos => pos !== currentPos);
        gridContainer.children[currentPos].innerHTML = '';
        playerBalls++;
        document.getElementById('playerBalls').innerHTML = 'מספר הכדורים: ' + playerBalls
    }
    gridContainer.children[playerPos].innerHTML = '';
    playerPos = currentPos;
    createPlayer();
    if (balls.length === 0) {
        setTimeout(() => {
            if (confirm('ניצחת! האם אתה רוצה להתחיל משחק חדש?')) {
                location.reload();
            } else {
                alert('ניצחת!!!');
            }
        }, 300);
    }
}

document.addEventListener('keydown', (event) => {
    let newPosition = playerPos;

    switch (event.key) {
        case 'ArrowUp':
            if (newPosition >= gridSize.cols) newPosition -= gridSize.cols;
            break;
        case 'ArrowDown':
            if (newPosition < totalCells - gridSize.cols) newPosition += gridSize.cols;
            break;
        case 'ArrowLeft':
            if (newPosition % gridSize.cols !== 0) newPosition -= 1;
            else if (newPosition == 36) newPosition--;
            break;
        case 'ArrowRight':
            if ((newPosition + 1) % gridSize.cols !== 0) newPosition += 1;
            else if (newPosition == 35) newPosition++;
            break;
        default:
            break;
    }

    if (newPosition !== playerPos && checkCell(newPosition)) {
        updatePlayerPos(newPosition);
    }
});
