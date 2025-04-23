import { setBackgroundForLevel, setInitialBackground, preloadBackgrounds } from './background.js';
import { startGame as startGameBoard, restartGame, moveTetrominoDown, moveTetrominoLeft, moveTetrominoRight, rotateTetromino, drawGameBoard, drawTetromino } from './gameBoard.js';
import { handleInputSetup, processInput } from './inputHandler.js';
import { increaseScore, levelUp, startGame as startScore, stopGame, resetGame } from './score.js';
import { startTimer, stopTimer, resetTimer } from './timer.js';
import { showPauseMenu, hidePauseMenu } from './pauseMenu.js';
import { startBackgroundMusic, stopBackgroundMusic, toggleMute } from './sound.js';
import { createRandomTetromino, toggleColorBlindMode } from './tetromino.js';


// Game state
let isPaused = false;
let isDownPressed = false;
let activeTetromino = null;
const dropInterval = 1000;
const softDropInterval = 50
let lastDropTime = 0;


// Initialize game board UI
drawGameBoard();

preloadBackgrounds();

// load background
window.addEventListener('DOMContentLoaded', () => {
    setInitialBackground();
  });

// Setup keyboard input listeners
handleInputSetup(onKeyDown, onKeyUp, (downPressed) => {
    isDownPressed = downPressed;
  });

// Start background music
startBackgroundMusic();

// Start the game flow
startGameFlow();

//trigger background change for level up.
function onLevelUp(newLevel) {
    setBackgroundForLevel(newLevel);
  }

// Game loop using requestAnimationFrame
function gameLoop(timestamp) {
    if (isPaused) return;
    updateGame(timestamp);
    drawGame();
    requestAnimationFrame(gameLoop);
  }

  function updateGame(timestamp = 0) {
    if (!activeTetromino) return;
    processInput(activeTetromino);
  
    const interval = isDownPressed ? softDropInterval : dropInterval;
  
    if (timestamp - lastDropTime > interval) {
      const result = moveTetrominoDown(activeTetromino);
  
      if (result === 'top-lock') {
        alert('Game Over!');
        isPaused = true;
        stopTimer();
        return;
      }
  
      if (result === true) {
        activeTetromino = createRandomTetromino();
      }
  
      lastDropTime = timestamp;
    }
  }

function drawGame() {
  drawGameBoard();
  if (activeTetromino) drawTetromino(activeTetromino);
  // Score and timer UI updated in their own modules
}

function startGameFlow() {
    resetGame();
    resetTimer();
    activeTetromino = createRandomTetromino();
    startGameBoard(activeTetromino);
    startTimer();
    hidePauseMenu();
    isPaused = false;
    lastDropTime = 0;
    requestAnimationFrame(gameLoop);
  }
  
  function restartGameFlow() {
    resetGame();
    resetTimer();
    activeTetromino = createRandomTetromino();
    restartGame(activeTetromino);
    startTimer();
    hidePauseMenu();
    isPaused = false;
    lastDropTime = 0;
    requestAnimationFrame(gameLoop);
  }

function togglePause() {
  if (isPaused) {
    isPaused = false;
    hidePauseMenu();
    startTimer();
    requestAnimationFrame(gameLoop);
  } else {
    isPaused = true;
    showPauseMenu();
    stopTimer();
  }
}

// Keyboard event handlers
function onKeyDown(e) {
  if (e.key === 'Escape') {
    togglePause();
  } else {
    processInput(e.key, activeTetromino);
  }
}

function onKeyUp(e) {
  // Optional: handle keyup if needed
}

// Button event listeners
document.getElementById('restartButton').addEventListener('click', restartGameFlow);
document.getElementById('continueButton').addEventListener('click', togglePause);
