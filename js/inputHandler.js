import { moveTetrominoLeft, moveTetrominoRight, rotateTetromino, hardDropTetromino } from './gameBoard.js';
import { switchTetromino } from './app.js';

let keysPressed = {};
let isDownPressed = false;

let onDownChange = null; // callback

export function handleInputSetup(onKeyDown, onKeyUp, onDownChangeCallback) {
  onDownChange = onDownChangeCallback;

  document.addEventListener('keydown', (e) => {
    if (!keysPressed[e.key]) {
      keysPressed[e.key] = true;
      if (e.key === 'ArrowDown') {
        isDownPressed = true;
        if (onDownChange) onDownChange(true);
      }
      onKeyDown(e);
    }
  });

  document.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
    if (e.key === 'ArrowDown') {
      isDownPressed = false;
      if (onDownChange) onDownChange(false);
    }
    if (onKeyUp) onKeyUp(e);
  });
}

export function processInput(key, activeTetromino) {
  if (!activeTetromino) return false;

  switch (key) {
    case 'ArrowLeft':
      moveTetrominoLeft(activeTetromino);
      return false;

    case 'ArrowRight':
      moveTetrominoRight(activeTetromino);
      return false;

    case 'ArrowUp':
      // Rotate clockwise
      rotateTetromino(activeTetromino, 'CW');
      return false;

    case 'z':
    case 'Z':
      // Rotate counter-clockwise
      rotateTetromino(activeTetromino, 'CCW');
      return false;

    case 's':
    case 'S':
        switchTetromino();
        return false;

    case ' ':
      // Hard drop
      return hardDropTetromino(activeTetromino);

    default:
      return false;
  }
}