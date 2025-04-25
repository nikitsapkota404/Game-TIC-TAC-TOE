
let boxes = document.querySelectorAll(".game-box");
let resetButton = document.querySelector(".reset-btn");
let winMsg = document.querySelector(".win-msg");
let message = document.querySelector("#winner");
let drawMessage = document.querySelector("#draw");
let FirstplayerTurn = true;
let countMove = 0;
let isGameOver = false;

const toWin = [ // Criteria for winning game i.e. patterns of tic-tac-toe
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]
];

boxes.forEach((gameBox) => {
    gameBox.addEventListener("click", () => {
        // Prevent action if the box is already played or game is over
        if (gameBox.classList.contains("played") || isGameOver) {
            return;
        }
        // Alternate turns between player X and O
        if (FirstplayerTurn) {
            gameBox.innerText = "X";
            gameBox.style.color = "Red";
            FirstplayerTurn = false;
        } else {
            gameBox.innerText = "O";
            gameBox.style.color = "Green";
            FirstplayerTurn = true;
        }

        gameBox.classList.add("played");
        countMove++;
        gameBox.disabled = true;
        checkWinner(); 
    });
});


const highlightWin = (winnerCell) => {
    winnerCell.forEach((cell) => {
        cell.classList.add("win-animation");
    });
};


const showWinner = (winner, winnerCell) => {
    // Hide draw message and show winner message
    drawMessage.style.display = "none";
    message.style.display = "block";
    message.innerText = `Winner is ${winner}`;
    winMsg.classList.remove("hidemsg");
    isGameOver = true; 
    boxes.forEach((box) => box.disabled = true);

    highlightWin(winnerCell);
};


const showDraw = () => {
    // Hide winner message and show draw message
    message.style.display = "none";
    drawMessage.style.display = "block";
    drawMessage.innerText = "Game Draw! Click New to play again.";
    winMsg.classList.remove("hidemsg");
    isGameOver = true; 
    boxes.forEach((box) => box.disabled = true); 
};

const checkWinner = () => {
    for (let winPattern of toWin) {
        let position1 = boxes[winPattern[0]].innerText;
        let position2 = boxes[winPattern[1]].innerText;
        let position3 = boxes[winPattern[2]].innerText;

        if (position1 && position2 && position3) {
            if (position1 === position2 && position2 === position3) {
                showWinner(position1, [boxes[winPattern[0]], boxes[winPattern[1]], boxes[winPattern[2]]]);
                return; 
            }
        }
    }

    if (countMove === 9 && !isGameOver) {
        showDraw(); 
    }
};

resetButton.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("played", "win-animation"); 
    });
    winMsg.classList.add("hidemsg"); 
    // Reset both messages to hidden
    message.style.display = "none";
    drawMessage.style.display = "none";
    FirstplayerTurn = true;
    countMove = 0;
    isGameOver = false; 
});
