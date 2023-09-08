import { WINNER_PATTERNS } from "../constants"

export const checkWinner = (board) => {
  // check if board matches any winner pattern
  for (const pattern of WINNER_PATTERNS) {
    const [a, b, c] = pattern
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a]
    }
  }

  // if no winner
  return null
}