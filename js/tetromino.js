export const normalPalette = [
    { shape: [[1,1,1],[0,1,0]], color: '#A3D8FF' }, // T
    { shape: [[1,1],[1,1]], color: '#fff1A8' },     // O
    { shape: [[1,1,0],[0,1,1]], color: '#D4A6FF' }, // S
    { shape: [[1,0,0],[1,1,1]], color: '#FFB6A6' }, // L
    { shape: [[0,0,1],[1,1,1]], color: '#7FFFD4' }, // J
    { shape: [[0,1,1],[1,1,0]], color: '#A7D8A3' }, // Z
    { shape: [[1,1,1,1]], color: '#FF86C2' },       // I
  ];
  
export const colorBlindPalette = [
    { shape: [[1,1,1],[0,1,0]], color: '#4CC9FF' },
    { shape: [[1,1],[1,1]], color: '#C6D000' },
    { shape: [[1,1,0],[0,1,1]], color: '#FF66B2' },
    { shape: [[1,0,0],[1,1,1]], color: '#2E9CCF' },
    { shape: [[0,0,1],[1,1,1]], color: '#FFA500' },
    { shape: [[0,1,1],[1,1,0]], color: '#55B82C' },
    { shape: [[1,1,1,1]], color: '#A16CFF' },
  ];
  
  let colorBlindMode = false;
  
  export function toggleColorBlindMode() {
    colorBlindMode = !colorBlindMode;
  }
  
  function getPalette() {
    return colorBlindMode ? colorBlindPalette : normalPalette;
  }
  
  export function createRandomTetromino() {
    const palette = getPalette();
    const index = Math.floor(Math.random() * palette.length);
    const { shape, color } = palette[index];
    return {
      shape,
      color,
      x: 4,
      y: 0,
      rotation: 0,
    };
  }
  