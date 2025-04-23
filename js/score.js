import { startTimer, stopTimer, resetTimer } from './timer.js';
import { setBackgroundForLevel, setInitialBackground } from './background.js';

let score = 0;
let currentLevel = 1;

// Initialize background on game start or reset
function initialize() {
  setInitialBackground();
  updateScoreboard();
}

function updateScoreboard() {
  const scoreElement = document.getElementById('score');
  const levelElement = document.getElementById('level');

  scoreElement.innerText = `Score: ${score}`;
  levelElement.innerText = `Level: ${currentLevel}`;
}

function levelUp() {
  currentLevel++;
  setBackgroundForLevel(currentLevel);  // Update background on level up
  updateScoreboard();
}

function increaseScore(points) {
  score += points;
  if (score >= currentLevel * 1000) {
    levelUp();
  }
  updateScoreboard();
}

function startGame() {
  resetTimer();
  startTimer();
  initialize();
}

function stopGame() {
  stopTimer();
}

function resetGame() {
  score = 0;
  currentLevel = 1;
  resetTimer();
  initialize();
}

export { increaseScore, levelUp, startGame, stopGame, resetGame };
