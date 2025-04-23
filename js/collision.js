export function checkForCollision(tetromino, board, offsetX = 0, offsetY = 0) {
    const { shape, x, y } = tetromino;
  
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] === 1) {
          const newX = x + col + offsetX;
          const newY = y + row + offsetY;
  
          if (
            newX < 0 ||
            newX >= board[0].length ||
            newY >= board.length ||
            (newY >= 0 && board[newY][newX] !== 0)
          ) {
            return true;
          }
        }
      }
    }
  
    return false;
  }
  