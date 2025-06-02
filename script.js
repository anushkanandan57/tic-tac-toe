
const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let isXNext = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWinner = () => {
    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'Draw';
};

const handleClick = (e) => {
    const index = Array.from(cells).indexOf(e.target);
    if (board[index] || checkWinner()) return;

    board[index] = isXNext ? 'X' : 'O';
    e.target.textContent = board[index];
    const winner = checkWinner();
    if (winner) {
        statusDisplay.textContent = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;
    } else {
        isXNext = !isXNext;
    }
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = '';
    isXNext = true;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
