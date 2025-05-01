export const normalPalette = [
    { 
      type: 'T', 
      shape: [
        [0,1,0],
        [1,1,1],
        [0,0,0]
      ], 
      color: '#A3D8FF' 
    },
    { 
      type: 'O', 
      shape: [
        [1,1,0],
        [1,1,0],
        [0,0,0]
      ], 
      color: '#fff1A8' 
    },
    { 
      type: 'S', 
      shape: [
        [0,1,1],
        [1,1,0],
        [0,0,0]
      ], 
      color: '#D4A6FF' 
    },
    { 
      type: 'L', 
      shape: [
        [1,0,0],
        [1,1,1],
        [0,0,0]
      ], 
      color: '#FFB6A6' 
    },
    { 
      type: 'J', 
      shape: [
        [0,0,1],
        [1,1,1],
        [0,0,0]
      ], 
      color: '#7FFFD4' 
    },
    { 
      type: 'Z', 
      shape: [
        [1,1,0],
        [0,1,1],
        [0,0,0]
      ], 
      color: '#A7D8A3' 
    },
    { 
      type: 'I', 
      shape: [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ], 
      color: '#FF86C2' 
    },
  ];
  
  export const colorBlindPalette = [
    { 
      type: 'T', 
      shape: [
        [0,1,0],
        [1,1,1],
        [0,0,0]
      ], 
      color: '#4CC9FF' 
    },
    { 
      type: 'O', 
      shape: [
        [1,1,0],
        [1,1,0],
        [0,0,0]
      ], 
      color: '#C6D000' 
    },
    { 
      type: 'S', 
      shape: [
        [0,1,1],
        [1,1,0],
        [0,0,0]
      ], 
      color: '#FF66B2' 
    },
    { 
      type: 'L', 
      shape: [
        [1,0,0],
        [1,1,1],
        [0,0,0]
      ], 
      color: '#2E9CCF' 
    },
    { 
      type: 'J', 
      shape: [
        [0,0,1],
        [1,1,1],
        [0,0,0]
      ], 
      color: '#FFA500' 
    },
    { 
      type: 'Z', 
      shape: [
        [1,1,0],
        [0,1,1],
        [0,0,0]
      ], 
      color: '#55B82C' 
    },
    { 
      type: 'I', 
      shape: [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ], 
      color: '#A16CFF' 
    },
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
    const { shape, color, type } = palette[index];
    return {
      shape,
      color,
      type,
      x: type === 'I' ? 3 : 4,  
      y: type === 'I' ? -1 : 0, 
      rotationState: 0,
    };
  }
  