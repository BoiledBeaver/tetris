
  export function checkForCollision(tetromino, board, offsetX = 0, offsetY = 0) {
    const { shape, x, y } = tetromino;
    const newX = x + offsetX;
    const newY = y + offsetY;
  
    return shape.some((row, dy) => 
      row.some((cell, dx) => {
        if (!cell) return false;
        const boardX = newX + dx;
        const boardY = newY + dy;
        return boardX < 0 || 
               boardX >= board[0].length || 
               boardY >= board.length ||
               (boardY >= 0 && board[boardY][boardX]);
      })
    );
  }