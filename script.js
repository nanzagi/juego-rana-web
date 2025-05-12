let board = [];
let moveCount = 0;
let selectedPos = -1;

function initializeGame(n) {
    const mid = Math.floor((n - 1) / 2);
    board = Array(mid).fill("v").concat("_", Array(mid).fill("r"));
    moveCount = 0;
    renderBoard();
}

function renderBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = ""; // Limpiar el tablero

    board.forEach((cell, index) => {
        const button = document.createElement("button");
        button.className = cell === "v" ? "green" : cell === "r" ? "red" : "";
        button.textContent = cell === "_" ? "_" : "";
        button.addEventListener("click", () => onButtonClick(index));
        boardContainer.appendChild(button);
    });

    document.getElementById("move-count").textContent = `Movimientos: ${moveCount}`;
}

function isValidMove(pos, direction) {
    const target = pos + direction;
    if (target < 0 || target >= board.length) return false;

    if (board[target] === "_") return true;

    const jumpTarget = pos + 2 * direction;
    return (
        jumpTarget >= 0 &&
        jumpTarget < board.length &&
        board[target] !== "_" &&
        board[target] !== board[pos] &&
        board[jumpTarget] === "_"
    );
}

function makeMove(pos, direction) {
    const target = pos + direction;

    if (board[target] === "_") {
        [board[target], board[pos]] = [board[pos], "_"];
    } else {
        const jumpTarget = pos + 2 * direction;
        [board[jumpTarget], board[pos]] = [board[pos], "_"];
    }

    moveCount++;
    renderBoard();
    checkWinCondition();
}

function onButtonClick(pos) {
    if (selectedPos === -1) {
        if (board[pos] === "v" || board[pos] === "r") {
            selectedPos = pos;
        }
    } else {
        const direction = pos > selectedPos ? 1 : -1;
        if (isValidMove(selectedPos, direction)) {
            makeMove(selectedPos, direction);
        }
        selectedPos = -1;
    }
}

function checkWinCondition() {
    const mid = Math.floor((board.length - 1) / 2);
    const leftSide = board.slice(0, mid);
    const rightSide = board.slice(mid + 1);

    if (leftSide.every(cell => cell === "r") && rightSide.every(cell => cell === "v")) {
        alert(`¡Juego terminado en ${moveCount} movimientos!`);
        document.getElementById("game-container").style.display = "none";
        document.getElementById("setup-container").style.display = "block";
    }
}

// Manejar el inicio del juego
document.getElementById("start-game").addEventListener("click", () => {
    const numRanas = parseInt(document.getElementById("num-ranas").value, 10);
    if (numRanas < 1 || numRanas > 10) {
        alert("Por favor, elige un número entre 1 y 10.");
        return;
    }
    document.getElementById("setup-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    initializeGame(numRanas * 2 + 1); // El tamaño del tablero es 2 * numRanas + 1
});