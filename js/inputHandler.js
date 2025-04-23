import { moveTetrominoLeft, moveTetrominoRight, rotateTetromino } from './gameBoard.js';

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
  if (!activeTetromino) return;

  switch (key) {
    case 'ArrowLeft':
      moveTetrominoLeft(activeTetromino);
      break;
    case 'ArrowRight':
      moveTetrominoRight(activeTetromino);
      break;
    case 'ArrowUp':
      rotateTetromino(activeTetromino);
      break;
  }
}
