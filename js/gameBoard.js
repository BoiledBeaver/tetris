import { checkForCollision } from './collision.js';
import { clearFullLines } from './lineClear.js';
import { playSound } from './sound.js';

const ROWS = 20;
const COLS = 10;

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

export function drawTetromino(tetromino, isShadow = false) {
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
  
            cellDiv.classList.add('tetromino-block');
  
            if (isShadow) {
              // Use translucent color for shadow
              cellDiv.style.backgroundColor = hexToRGBA(tetromino.color, 0.1);
            } else {
              // Normal solid color
              cellDiv.style.backgroundColor = tetromino.color;
            }
          }
        }
      });
    });
  }
  
  // Helper to convert hex color to RGBA with alpha
  function hexToRGBA(hex, alpha) {
    let r = 0, g = 0, b = 0;
  
    if (hex[0] === '#') hex = hex.slice(1);
  
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
  
    return `rgba(${r},${g},${b},${alpha})`;
  }

  export function drawNextTetromino(tetromino) {
    const nextBoard = document.getElementById('next-board');
    const cells = nextBoard.children;
  
    // Clear previous preview
    Array.from(cells).forEach(cell => {
      cell.style.backgroundColor = '';
    });
  
    // Calculate center position for 4x4 grid
    const shapeWidth = tetromino.shape[0].length;
    const shapeHeight = tetromino.shape.length;
    const startX = Math.floor((4 - shapeWidth) / 2);
    const startY = Math.floor((4 - shapeHeight) / 2);
  
    // Draw new preview
    tetromino.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          const previewX = startX + x;
          const previewY = startY + y;
          const index = previewY * 4 + previewX;
          if (index >= 0 && index < cells.length) {
            cells[index].style.backgroundColor = tetromino.color;
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
  
        // Clear any tetromino-block class and background color
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

  export function initNextBoard() {
    const nextBoard = document.getElementById('next-board');
    nextBoard.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.className = 'next-cell';
      nextBoard.appendChild(cell);
    }
  }

  export function getShadowTetromino(activeTetromino, board) {
    const shadow = {
      shape: activeTetromino.shape,
      color: activeTetromino.color,
      x: activeTetromino.x,
      y: activeTetromino.y,
    };

    while (!checkForCollision(shadow, board, 0, 1)) {
      shadow.y += 1;
    }
  
    return shadow;
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
      return true;
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

export function hardDropTetromino(tetromino) {
    while (!checkForCollision(tetromino, board, 0, 1)) {
      tetromino.y += 1;
    }
  
    placeTetromino(tetromino);
    clearFullLines(board);
  
    return true;
  }


  const WALL_KICKS = {
    'I': [
      [[0,0], [-2,0], [1,0], [-2,-1], [1,2]],
      [[0,0], [-1,0], [2,0], [-1,2], [2,-1]],
      [[0,0], [2,0], [-1,0], [2,1], [-1,-2]],
      [[0,0], [1,0], [-2,0], [1,-2], [-2,1]]
    ],
    'default': [
      [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
      [[0,0], [1,0], [1,-1], [0,2], [1,2]],
      [[0,0], [1,0], [1,1], [0,-2], [1,-2]],
      [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]]
    ]
  };
  
  export function rotateTetromino(tetromino, direction = 'CW') {
    if (tetromino.type === 'O') {
        return false; // do not rotate "o" piece
      }
    const originalShape = tetromino.shape;
    const newRotationState = (tetromino.rotationState + (direction === 'CW' ? 1 : 3)) % 4;
    
    // Rotate the matrix
    const rotatedShape = rotateMatrix(originalShape, direction);
  
    // Select kick table based on type and current rotation state
    const kickTable = tetromino.type === 'I' 
      ? WALL_KICKS.I[tetromino.rotationState] 
      : WALL_KICKS.default[tetromino.rotationState];
  
    for (const [xOffset, yOffset] of kickTable) {
      if (!checkForCollision(
        { ...tetromino, shape: rotatedShape },
        board,
        xOffset,
        yOffset
      )) {
        // Apply rotation and kick offset
        tetromino.shape = rotatedShape;
        tetromino.x += xOffset;
        tetromino.y += yOffset;
        tetromino.rotationState = newRotationState;
        return true;
      }
    }
    return false;
  }
  
  function rotateMatrix(matrix, direction) {
    const N = matrix.length;
    const result = Array(N).fill().map(() => Array(N).fill(0));
    
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (direction === 'CW') {
          result[x][N-1-y] = matrix[y][x];
        } else {
          result[N-1-x][y] = matrix[y][x];
        }
      }
    }
    return result;
  }

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
  return cellValue;
}

export function getBoard() {
    return board;
  }
