let timer = 0;
let intervalId = null;

export function startTimer() {
  if (intervalId) return; // prevent multiple intervals
  intervalId = setInterval(() => {
    timer++;
    updateTimerDisplay();
  }, 1000);
}

export function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

export function resetTimer() {
  timer = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('timer');
  const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
  const seconds = (timer % 60).toString().padStart(2, '0');
  timerEl.textContent = `Time: ${minutes}:${seconds}`;
}

