export const TOTAL_BACKGROUNDS = 15;
const backgroundImages = Array.from(
  { length: TOTAL_BACKGROUNDS },
  (_, i) => `images/background${i + 1}.png`
);


export function preloadBackgrounds() {
  for (let i = 1; i <= TOTAL_BACKGROUNDS; i++) {
    const img = new Image();
    img.src = `images/background${i}.png`;
  }
}

export function setBackgroundForLevel(level) {
    const index = Math.min(Math.max(level, 1), TOTAL_BACKGROUNDS) - 1;
    const imageUrl = `images/background${index + 1}.png`;
    
    // Set background immediately
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    
    if (index === TOTAL_BACKGROUNDS - 1) {
        document.body.classList.add('no-blur');
      } else {
        document.body.classList.remove('no-blur');
      }

    // Preload image for future use
    const img = new Image();
    img.src = imageUrl;
}

export function setInitialBackground() {
    setBackgroundForLevel(1);
}