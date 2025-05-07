import { moveTetrominoLeft, moveTetrominoRight, rotateTetromino, hardDropTetromino } from './gameBoard.js';
import { switchTetromino } from './app.js';

let keysPressed = {};
let isDownPressed = false;
let onDownChange = null; // callback

// Input mode: 'tapper' or 'slider'
let inputMode = localStorage.getItem('tetrisInputMode') || 'tapper';

// Repeat timing constants for slider mode
const REPEAT_DELAY = 200;    // ms before repeat starts
const REPEAT_INTERVAL = 50;  // ms between repeats

// Track key hold start and last repeat time for slider mode
let keyHoldTimers = {};
let lastRepeatTime = {};

// Key categories
const movementKeys = ['ArrowLeft', 'ArrowRight'];
const rotationKeys = ['ArrowUp', 'z', 'Z'];
const softDropKey = 'ArrowDown';
const hardDropKey = ' ';

// Helper to check if key is left/right or rotate key
function isMovementKey(key) {
  return movementKeys.includes(key) || rotationKeys.includes(key);
}

// Exported functions to get/set input mode
export function setInputMode(mode) {
  if (mode === 'tapper' || mode === 'slider') {
    inputMode = mode;
    localStorage.setItem('tetrisInputMode', mode);
  }
}

export function getInputMode() {
  return inputMode;
}

export function handleInputSetup(onKeyDown, onKeyUp, onDownChangeCallback) {
  onDownChange = onDownChangeCallback;

  document.addEventListener('keydown', (e) => {
    if (!keysPressed[e.key]) {
      keysPressed[e.key] = true;

      if (e.key === softDropKey) {
        isDownPressed = true;
        if (onDownChange) onDownChange(true);
        onKeyDown(e);
        return;
      }

      if (e.key === hardDropKey) {
        onKeyDown(e);
        return;
      }

      if (inputMode === 'slider' && isMovementKey(e.key)) {
        // Slider mode: start custom repeat for left/right/rotate keys
        keyHoldTimers[e.key] = performance.now();
        lastRepeatTime[e.key] = 0;
        e.preventDefault(); // Prevent native repeat for these keys
        onKeyDown(e);
        return;
      }

      // Tapper mode or other keys: just call onKeyDown (native repeat allowed)
      onKeyDown(e);
    }
  });

  document.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
    delete keyHoldTimers[e.key];
    delete lastRepeatTime[e.key];

    if (e.key === softDropKey) {
      isDownPressed = false;
      if (onDownChange) onDownChange(false);
    }

    if (onKeyUp) onKeyUp(e);
  });
}

export function processHeldKeys(activeTetromino) {
  if (!activeTetromino || inputMode === 'tapper') return;

  const now = performance.now();

  for (const key in keysPressed) {
    if (keysPressed[key] && isMovementKey(key)) {
      const holdTime = now - (keyHoldTimers[key] || now);
      const timeSinceLastRepeat = now - (lastRepeatTime[key] || 0);

      if (holdTime > REPEAT_DELAY && timeSinceLastRepeat > REPEAT_INTERVAL) {
        processInput(key, activeTetromino);
        lastRepeatTime[key] = now;
      }
    }
  }
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