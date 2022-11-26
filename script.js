let snake = [], snakeLength= 1, snakeInitialRow = 3, snakeInitialColumn = 4, appleCounter = 0, previousPositionRow = 0, previousPositionColumn = 0, endGame = 0;
let previousInterval, previousKeyPressed = 0;
document.onkeydown = keyHandler;

window.onload = function() {
    startGame();
}

function startGame() {
    document.getElementById("grid").appendChild(createTable());
    placeAppleRandomly();
    createSnake();
    keyHandler();
}

function createTable() {
    let grid = document.createElement('table');
    for (let i = 0; i < 15; ++i) {
        let row = document.createElement("tr");
        for (let j = 0; j < 17; ++j) {
            let cell = document.createElement("td");
            cell.id = i + "-" + j;
            cell.className = "cell";
            if (i % 2 != 0) {
                if (j % 2 == 0) {
                    cell.style.backgroundColor = "rgba(164, 231, 87, 0.514)";
                }
            } else if (i % 2 == 0) {
                if (j % 2 != 0) {
                    cell.style.backgroundColor = "rgba(164, 231, 87, 0.514)";
                }
            }
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    return grid;
}

function createSnake() {
    snake[0] = document.createElement('td');
    snake[0].id = snakeInitialRow + "-" + snakeInitialColumn;
    document.getElementById(snake[0].id).className = "snakeHead";
    snake[snakeLength] = document.createElement('td');
    snake[snakeLength].id = snakeInitialRow + "-" + (snakeInitialColumn - 1);
    document.getElementById(snake[snakeLength].id).className = "snakeEndTail";
}

function placeAppleRandomly() {
    let randomRow = Math.floor(Math.random() * 15);
    let randomColumn = Math.floor(Math.random() * 17);
    if (randomRow == 3 && (randomColumn == 3 || randomColumn == 4)) {
        placeAppleRandomly();
    } else {
        randomApple = document.createElement("img");
        randomApple.src = "appleIcon.png";
        randomApple.id = randomRow + "-" + randomColumn;
        document.getElementById(randomApple.id).appendChild(randomApple);
    }
}

function keyHandler(e) {
    e = e || window.event;
    clearInterval(previousInterval);
    if (e.keyCode == '37' && previousKeyPressed != '39') {
        if (endGame == 0) {
            previousInterval = setInterval(function() {
                handleLeftArrow();
            }, 100)
            previousKeyPressed = '37';
        } else {
            e.preventDefault();
        }
    } else if (e.keyCode == '38' && previousKeyPressed != '40') {
        if (endGame == 0) {
            previousInterval = setInterval(function() {
                handleUpArrow();   
            }, 100)
            previousKeyPressed = '38';
        } else {
            e.preventDefault();
        }
    } else if (e.keyCode == '39' && previousKeyPressed != '37') {
        if (endGame == 0) {
            previousInterval = setInterval(function() {
                handleRightArrow();   
            }, 100)
            previousKeyPressed = '39';
        } else {
            e.preventDefault();
        }
    } else if (e.keyCode == '40' && previousKeyPressed != '38') {
        if (endGame == 0) {
            previousInterval = setInterval(function() {
                handleDownArrow();            
            }, 100)
            previousKeyPressed = '40';
        } else {
            e.preventDefault();
        }
    }
}

function addTail() {
    snake[++snakeLength] = document.createElement('td');
    snake[snakeLength].id = previousPositionRow + "-" + previousPositionColumn;
    document.getElementById(snake[snakeLength].id).className = "snakeEndTail";
}

function handleLeftArrow() {
    let snakeHeadRow = snake[0].id.split('-')[0];
    let snakeHeadColumn = snake[0].id.split('-')[1];
    --snakeHeadColumn;
    if (snake[0].id.split('-')[1] == 0 || document.getElementById(snakeHeadRow + '-' + snakeHeadColumn).className === "snakeTail" || document.getElementById(snakeHeadRow + '-' + snakeHeadColumn).className === "snakeEndTail") {
        checkEndGame();
    } else {
        snakeMoveLeft(); 
    }
}

function handleUpArrow() {
    let snakeHeadRow = snake[0].id.split('-')[0];
    --snakeHeadRow;
    let snakeHeadColumn = snake[0].id.split('-')[1];
    if (snake[0].id.split('-')[0] == 0 || document.getElementById(snakeHeadRow + '-' + snakeHeadColumn).className === "snakeTail" || document.getElementById(snakeHeadRow + '-' + snakeHeadColumn).className === "snakeEndTail") {
        checkEndGame();
    } else {
        snakeMoveUP();
    }
}

function handleRightArrow() {
    let snakeHeadRow = snake[0].id.split('-')[0];
    let snakeHeadColumn = snake[0].id.split('-')[1];
    ++snakeHeadColumn;
    if (snake[0].id.split('-')[1] == 16 || document.getElementById(snakeHeadRow + '-' + snakeHeadColumn).className === "snakeTail" || document.getElementById(snakeHeadRow + '-' + snakeHeadColumn).className === "snakeEndTail") {    
        checkEndGame();
    } else {
        snakeMoveRight();
    }
}

function handleDownArrow() {
    let snakeHeadRow = snake[0].id.split('-')[0];
    ++snakeHeadRow;
    let snakeHeadColumn = snake[0].id.split('-')[1];
    if (snake[0].id.split('-')[0] == 14 || document.getElementById(snakeHeadRow + '-' + snakeHeadColumn).className === "snakeTail" || document.getElementById(snakeHeadRow + '-' + snakeHeadColumn).className === "snakeEndTail") {
        checkEndGame();
    } else {
        snakeMoveDown();
    }
}

function iterateTailCells() {
    for (let i = snakeLength; i >= 0; --i) {
        if (i == snakeLength) {
            previousPositionRow = snake[i].id.split('-')[0];
            previousPositionColumn = snake[i].id.split('-')[1];
            document.getElementById(snake[i].id).className = "cell";
            snake[i].id = snake[i - 1].id;
            document.getElementById(snake[i].id).className = "snakeEndTail";
        } else if (i - 1 >= 0) {
            snake[i].id = snake[i - 1].id;
            document.getElementById(snake[i].id).className = "snakeTail";
        }
    }
}

function snakeMoveLeft() {
    iterateTailCells();
    snake[0].id = snakeInitialRow + "-" + (--snakeInitialColumn);
    document.getElementById(snake[0].id).className = "snakeHead";
    checkAppleEaten(); 
}

function snakeMoveUP() {
    iterateTailCells();
    snake[0].id = (--snakeInitialRow) + "-" + snakeInitialColumn;
    document.getElementById(snake[0].id).className = "snakeHead";
    checkAppleEaten();
}

function snakeMoveRight() {
    iterateTailCells();
    snake[0].id = snakeInitialRow + "-" + (++snakeInitialColumn);
    document.getElementById(snake[0].id).className = "snakeHead";
    checkAppleEaten();
}

function snakeMoveDown() {
    iterateTailCells();
    snake[0].id = (++snakeInitialRow) + "-" + snakeInitialColumn;
    document.getElementById(snake[0].id).className = "snakeHead";
    checkAppleEaten();
}

function checkAppleEaten() {
    if (snake[0].id === randomApple.id) {
        document.getElementById(snake[snakeLength].id).className = "snakeTail";
        addTail();
        ++appleCounter;
        document.getElementById("appleCounter").innerHTML = appleCounter;
        document.getElementById(randomApple.id).innerHTML = '';
        placeAppleRandomly();
    }
}

function checkEndGame() {
    clearInterval(previousInterval);
    endGame = 1;
    document.getElementById("endGameMessage").style.display = "block";
    document.getElementById("resetButton").style.display = "inline-block";
    document.getElementById("resetButton").onclick = function() {
        document.location.reload();
    }
}
