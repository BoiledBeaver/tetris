import { startTimer, stopTimer, resetTimer } from './timer.js';
import { setBackgroundForLevel, setInitialBackground } from './background.js';

let score = 0;
let currentLevel = 1;
let totalLinesCleared = 0;
let nextLevelThreshold = 1000;
let comboMultiplier = 1;
let singles = 0, doubles = 0, triples = 0, tetrises = 0;

// Initialize background and scoreboard on game start or reset
function initialize() {
  setInitialBackground();
  updateScoreboard();
}

// Update scoreboard UI by querying elements fresh every time
function updateScoreboard() {
  const scoreElement = document.getElementById('score');
  const levelElement = document.getElementById('level');
  const linesElement = document.getElementById('linesCleared');
  const comboElement = document.getElementById('comboMultiplier');

  if (scoreElement) scoreElement.innerText = `Score: ${score}`;
  if (levelElement) levelElement.innerText = `Level: ${currentLevel}`;
  if (linesElement) linesElement.innerText = `Lines: ${totalLinesCleared}`;
  if (comboElement) comboElement.innerText = `${comboMultiplier.toFixed(1)}×`;
}

// Handle leveling up with exponential threshold increase
function levelUp() {
  currentLevel++;
  nextLevelThreshold = Math.floor(nextLevelThreshold * 1.8);
  setBackgroundForLevel(currentLevel);
  updateScoreboard();
}

let comboTimeoutId = null;
const COMBO_TIMEOUT_MS = 5000; // 5 seconds to continue combo
const MAX_COMBO_MULTIPLIER = 4;


// Increase score based on lines cleared count, level, and combo multiplier
function increaseScore(linesClearedCount) {
    if (linesClearedCount <= 0) return;
  
    // Base points per line clear type
    let basePoints = 0;
    switch (linesClearedCount) {
      case 1: basePoints = 100; singles++; break;
      case 2: basePoints = 300; doubles++; break;
      case 3: basePoints = 500; triples++; break;
      case 4: basePoints = 800; tetrises++; break;
      default: basePoints = 100 * linesClearedCount; // fallback
    }
  
    // Calculate points with level and combo multipliers
    const points = basePoints * currentLevel * comboMultiplier;
  
    score += points;
    totalLinesCleared += linesClearedCount;
  
    // Increase combo multiplier for consecutive clears, capped
    comboMultiplier = Math.min(comboMultiplier + 0.5, MAX_COMBO_MULTIPLIER);
  
    // Reset combo timeout
    if (comboTimeoutId) clearTimeout(comboTimeoutId);
    comboTimeoutId = setTimeout(() => {
      comboMultiplier = 1;
      updateScoreboard();
    }, COMBO_TIMEOUT_MS);
  
    // Check for level up
    if (score >= nextLevelThreshold) {
      levelUp();
    }
  
    updateScoreboard();
  }

// Call this when a piece locks in place, passing how many lines it cleared
function onPieceLocked(linesClearedCount) {
    if (linesClearedCount === 0) {
      comboMultiplier = 1;
      if (comboTimeoutId) {
        clearTimeout(comboTimeoutId);
        comboTimeoutId = null;
      }
      updateScoreboard();
    } else {
      increaseScore(linesClearedCount);
    }
  }

// Start the game: reset timer and initialize scoreboard
function startGame() {
  resetTimer();
  startTimer();
  initialize();
}

// Stop the game timer
function stopGame() {
  stopTimer();
}

// Reset game stats and UI
function resetGame() {
  score = 0;
  currentLevel = 1;
  totalLinesCleared = 0;
  comboMultiplier = 1;
  singles = 0;
  doubles = 0;
  triples = 0;
  tetrises = 0;
  nextLevelThreshold = 1000;
  resetTimer();
  initialize();
}

// Get total lines cleared (for end screen or stats)
function getTotalLinesCleared() {
  return totalLinesCleared;
}

export {
  increaseScore,
  onPieceLocked,
  levelUp,
  startGame,
  stopGame,
  resetGame,
  getTotalLinesCleared
};