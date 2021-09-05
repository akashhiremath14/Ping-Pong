let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let boardCord = board.getBoundingClientRect();
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let x = true;
let y = true;
let leftPlayerLives = 3;
let rightPlayerLives = 3;

document.addEventListener("keydown", function(e) {
    if (e.key == "w") {
        movePaddle(leftPaddle, -window.innerHeight * 0.1);
    } else
    if (e.key == "s") {
        movePaddle(leftPaddle, window.innerHeight * 0.1);
    } else
    if (e.key == "ArrowUp") {
        movePaddle(rightPaddle, -window.innerHeight * 0.1);
    } else
    if (e.key == "ArrowDown") {
        movePaddle(rightPaddle, window.innerHeight * 0.1);
    }
})

function movePaddle(cPaddle, change) {
    let cPaddleCord = cPaddle.getBoundingClientRect();
    if (cPaddleCord.top + change >= boardCord.top && cPaddleCord.bottom + change <= boardCord.bottom)
        cPaddle.style.top = cPaddleCord.top + change + "px";
}

function resetGame() {
    ball.style.top = window.innerHeight * 0.45 + "px";
    ball.style.left = window.innerWidth * 0.45 + "px";
    requestAnimationFrame(moveBall);
}

function setColor(idx) {
    let allicons = document.querySelectorAll(".fas.fa-circle");
    allicons[idx].style.color = "red";
}

function moveBall() {
    let ballCord = ball.getBoundingClientRect();
    let ballTop = ballCord.top;
    let ballLeft = ballCord.left;
    let ballRight = ballCord.right;
    let ballBottom = ballCord.bottom;

    let hasTouchedLeft = ballLeft <= boardCord.left;
    let hasTouchedRight = ballRight + 10 >= boardCord.right;
    if (hasTouchedLeft || hasTouchedRight) {
        if (hasTouchedLeft) {
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if (leftPlayerLives <= 0) {

                alert("Game Over !!!   Player   B   WON");
                document.location.reload();
            } else {
                return resetGame();
            }
        } else {
            rightPlayerLives--;
            setColor(3 + rightPlayerLives);
            console.log(rightPlayerLives);
            if (rightPlayerLives <= 0) {

                alert("Game Over !!!   Player   A   WON");
                document.location.reload();
            } else {
                return resetGame();
            }
        }
    }
    if (ballTop <= boardCord.top || ballBottom >= boardCord.bottom)
        y = !y;
    //if (ballLeft <= boardCord.left || ballRight >= boardCord.right)
    //  x = !x;
    let leftPaddleCord = leftPaddle.getBoundingClientRect();
    let rightPaddleCord = rightPaddle.getBoundingClientRect();
    if (ballLeft <= leftPaddleCord.right && ballRight >= leftPaddleCord.left &&
        ballTop + 20 >= leftPaddleCord.top && ballBottom - 20 <= leftPaddleCord.bottom) {
        x = !x;
    }
    if (ballLeft <= rightPaddleCord.right && ballRight >= rightPaddleCord.left &&
        ballTop + 20 >= rightPaddleCord.top && ballBottom - 20 <= rightPaddleCord.bottom) {
        x = !x;
    }
    ball.style.top = y == true ? ballTop + 4 + "px" : ballTop - 4 + "px";
    ball.style.left = x == true ? ballLeft + 4 + "px" : ballLeft - 4 + "px";
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);