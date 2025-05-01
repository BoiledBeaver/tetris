import { setBackgroundForLevel, setInitialBackground, preloadBackgrounds } from './background.js';
import { getBoard, startGame as startGameBoard, restartGame, moveTetrominoDown, moveTetrominoLeft, moveTetrominoRight, rotateTetromino, getShadowTetromino, drawTetromino, drawGameBoard, drawNextTetromino, initNextBoard } from './gameBoard.js';
import { handleInputSetup, processInput } from './inputHandler.js';
import { getTotalLinesCleared, increaseScore, levelUp, startGame as startScore, stopGame, resetGame } from './score.js';
import { startTimer, stopTimer, resetTimer } from './timer.js';
import { showPauseMenu, hidePauseMenu, showStartScreen, hideStartScreen, showEndScreen, hideEndScreen } from './menus.js';
import { startBackgroundMusic, stopBackgroundMusic, toggleMute } from './sound.js';
import { createRandomTetromino, toggleColorBlindMode, normalPalette, colorBlindPalette } from './tetromino.js';


// Game state
let isPaused = false;
let isDownPressed = false;
let activeTetromino = null;
let nextTetromino = null;
const dropInterval = 1000;
const softDropInterval = 50
let lastDropTime = 0;


// Initialize game board UI
drawGameBoard();

preloadBackgrounds();

// load background
window.addEventListener('DOMContentLoaded', () => {
    setInitialBackground();
    initNextBoard();
    drawGameBoard();

    showStartScreen();
    isPaused = true;
  });

// Setup keyboard input listeners
handleInputSetup(onKeyDown, onKeyUp, (downPressed) => {
    isDownPressed = downPressed;
  });

// Start background music
startBackgroundMusic();


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

export function switchTetromino() {
    // Swap active and next tetromino objects
    const temp = activeTetromino;
    activeTetromino = nextTetromino;
    nextTetromino = temp;
  
    // Reset active tetromino position and rotation
    activeTetromino.x = activeTetromino.type === 'I' ? 3 : 4;
    activeTetromino.y = activeTetromino.type === 'I' ? -1 : 0;
    activeTetromino.rotationState = 0;
  
    // Update next tetromino preview
    drawNextTetromino(nextTetromino);
  
    // Redraw game to reflect changes
    drawGame();
  }

  function updateGame(timestamp = 0) {
    if (!activeTetromino) return;
    processInput(activeTetromino);
  
    const interval = isDownPressed ? softDropInterval : dropInterval;
  
    if (timestamp - lastDropTime > interval) {
      const result = moveTetrominoDown(activeTetromino);
  
      if (result === 'top-lock') {
        isPaused = true;
        stopTimer();

        const score = document.getElementById('score').textContent.replace('Score: ', '');
        const level = document.getElementById('level').textContent.replace('Level: ', '');
        const timer = document.getElementById('timer').textContent.replace('Time: ', '');
        updateEndScreenStats(score, level, timer);
        showEndScreen();
        return;
      }
  
      if (result === true) {
        activeTetromino = nextTetromino;
        nextTetromino = createRandomTetromino();
        drawNextTetromino(nextTetromino);
      }
  
      lastDropTime = timestamp;
    }
  }

  function getColorForShape(shape) {
    const palette = colorBlindMode ? colorBlindPalette : normalPalette;
    for (const tetro of palette) {
      if (JSON.stringify(tetro.shape) === JSON.stringify(shape)) {
        return tetro.color;
      }
    }
    return '#000';
  }

function drawGame() {
  drawGameBoard();
  if (activeTetromino) drawTetromino(activeTetromino);
  
  const board = getBoard();
  const shadowTetromino = getShadowTetromino(activeTetromino, board);

  drawTetromino(shadowTetromino, true);
  drawTetromino(activeTetromino);
}

document.getElementById('colorBlindToggle').addEventListener('click', () => {
    toggleColorBlindMode();
  
    if (activeTetromino) {
      activeTetromino.color = getColorForShape(activeTetromino.shape);
    }
    if (nextTetromino) {
      nextTetromino.color = getColorForShape(nextTetromino.shape);
    }
  
    drawGame();
    drawNextTetromino(nextTetromino);

    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.focus({ preventScroll: true });
    }
  });

function startGameFlow() {
    resetGame();
    resetTimer();
    nextTetromino = createRandomTetromino(); 
    activeTetromino = createRandomTetromino(); 
    startGameBoard(activeTetromino);
    startTimer();
    hidePauseMenu();
    isPaused = false;
    lastDropTime = 0;
    drawNextTetromino(nextTetromino); 
    requestAnimationFrame(gameLoop);
  }
  
  function restartGameFlow() {
    resetGame();
    resetTimer();
    nextTetromino = createRandomTetromino();
    activeTetromino = createRandomTetromino();
    restartGame(activeTetromino);
    startTimer();
    hidePauseMenu();
    isPaused = false;
    lastDropTime = 0;
    drawNextTetromino(nextTetromino);
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
    const locked = processInput(e.key, activeTetromino);
    if (locked) {
        activeTetromino = nextTetromino;
        nextTetromino = createRandomTetromino();
        drawNextTetromino(nextTetromino);
  }
}
}

function onKeyUp(e) {

}

// Button event listeners
document.getElementById('restartButton').addEventListener('click', restartGameFlow);
document.getElementById('restartButtonEnd').addEventListener('click', () => {
    hideEndScreen();
    restartGameFlow();
    isPaused = false;
    requestAnimationFrame(gameLoop);
  });
  document.getElementById('startButton').addEventListener('click', () => {
    hideStartScreen();
    restartGameFlow();
    isPaused = false;
    requestAnimationFrame(gameLoop);
  });
document.getElementById('continueButton').addEventListener('click', togglePause);

function updateEndScreenStats(score, level, timer) {
    document.getElementById('finalScore').textContent = `Final Score: ${score}`;
    document.getElementById('finalLevel').textContent = `Final Level: ${level}`;
    document.getElementById('finalLines').textContent = `Total Lines: ${getTotalLinesCleared()}`;
    document.getElementById('finalTimer').textContent = `Time Played: ${timer}`;
  }