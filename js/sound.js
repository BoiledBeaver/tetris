const sounds = {
    lineClear: new Audio('sounds/line-clear.mp3'),
    gameOver: new Audio('sounds/game-over.mp3'),
    backgroundMusic: new Audio('sounds/background.mp3'),
  };

  sounds.backgroundMusic.volume = 0.4;

  
  export function playSound(name) {
    if (sounds[name]) {
      sounds[name].currentTime = 0;
      sounds[name].play().catch((error) => {
        console.warn(`Audio playback failed: ${error.message}`);
      });
    }
  }
  
  export function startBackgroundMusic() {
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.play();
    sounds.backgroundMusic.play().catch((error) => {
        console.warn(`Background music playback failed: ${error.message}`);
      });
    }
  
    export function pauseBackgroundMusic() {
      sounds.backgroundMusic.pause();
    }
    
    export function resumeBackgroundMusic() {
      sounds.backgroundMusic.play().catch((error) => {
        console.warn(`Background music playback failed: ${error.message}`);
      });
    }

  export function stopBackgroundMusic() {
    sounds.backgroundMusic.pause();
    sounds.backgroundMusic.currentTime = 0;
  }
  
  export function toggleMute() {
    const muted = sounds.backgroundMusic.muted;
    for (const key in sounds) {
      sounds[key].muted = !muted;
    }
  }
  
