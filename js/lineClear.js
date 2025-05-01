import { increaseScore } from './score.js';

export function clearFullLines(board) {
    let linesCleared = 0;
  
    for (let y = board.length - 1; y >= 0; y--) {
      if (board[y].every(cell => cell !== 0)) {
        board.splice(y, 1);
        board.unshift(new Array(board[0].length).fill(0));
        linesCleared++;
        y++; 
      }
    }
  
    increaseScore(linesCleared);
  }