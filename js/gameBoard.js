import { checkForCollision } from './collision.js';
import { clearFullLines } from './lineClear.js';
import { playSound } from './sound.js';

const ROWS = 20;
const COLS = 10;

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

/* export function drawGameBoard() {
  const gameBoardElement = document.getElementById('game-board');
  gameBoardElement.innerHTML = '';

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement('div');
      cell.classList.add('game-cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.style.backgroundColor = board[row][col] ? getTetrominoColor(board[row][col]) : '';
      gameBoardElement.appendChild(cell);
    }
  }
}

export function drawTetromino(tetromino) {
  if (!tetromino) return;
  const gameBoardElement = document.getElementById('game-board');
  const cells = gameBoardElement.children;

  tetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        const boardX = tetromino.x + x;
        const boardY = tetromino.y + y;
        if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
          const index = boardY * COLS + boardX;
          cells[index].style.backgroundColor = tetromino.color;
        }
      }
    });
  });
}
 */
export function drawTetromino(tetromino) {
    if (!tetromino) return;
    const gameBoardElement = document.getElementById('game-board');
    const cells = gameBoardElement.children;
  
    tetromino.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          const boardX = tetromino.x + x;
          const boardY = tetromino.y + y;
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            const index = boardY * COLS + boardX;
            const cellDiv = cells[index];
  
            // Add your CSS class for shadows and outlines
            cellDiv.classList.add('tetromino-block');
  
            // Set the background color dynamically from the tetromino's color
            cellDiv.style.backgroundColor = tetromino.color;
          }
        }
      });
    });
  }

export function drawGameBoard() {
    const gameBoardElement = document.getElementById('game-board');
    gameBoardElement.innerHTML = '';
  
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
  
        // Clear any tetromino-block class and background color (in case reused)
        cell.classList.remove('tetromino-block');
        cell.style.backgroundColor = '';
  
        cell.dataset.row = row;
        cell.dataset.col = col;
  
        // Set background color from locked blocks on board
        if (board[row][col]) {
          cell.classList.add('tetromino-block');
          cell.style.backgroundColor = board[row][col];
        }
  
        gameBoardElement.appendChild(cell);
      }
    }
  }

export function startGame(tetromino) {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

export function restartGame(tetromino) {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

export function moveTetrominoDown(tetromino) {
    if (!checkForCollision(tetromino, board, 0, 1)) {
      tetromino.y += 1;
      return false;
    } else {
      if (tetromino.y <= 0) {
        return 'top-lock';
      }
  
      placeTetromino(tetromino);
      clearFullLines(board);
      playSound('lineClear');
      return true; // locked
    }
  }

export function moveTetrominoLeft(tetromino) {
  if (!checkForCollision(tetromino, board, -1, 0)) {
    tetromino.x -= 1;
  }
}

export function moveTetrominoRight(tetromino) {
  if (!checkForCollision(tetromino, board, 1, 0)) {
    tetromino.x += 1;
  }
}

export function rotateTetromino(tetromino) {
  // Rotate shape matrix clockwise
  const rotatedShape = tetromino.shape[0].map((_, index) =>
    tetromino.shape.map(row => row[index]).reverse()
  );

  // Check collision for rotated shape
  if (!checkForCollision({ ...tetromino, shape: rotatedShape }, board, 0, 0)) {
    tetromino.shape = rotatedShape;
  }
}

// Helper: place tetromino blocks on board array
function placeTetromino(tetromino) {
  tetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        const boardX = tetromino.x + x;
        const boardY = tetromino.y + y;
        if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
          board[boardY][boardX] = tetromino.color;
        }
      }
    });
  });
}

function getTetrominoColor(cellValue) {
  // cellValue is color string in this setup
  return cellValue;
}

export function getBoard() {
    return board;
  }