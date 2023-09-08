import { useState } from 'react'
import { Cell } from './components/Cell'
import './App.css'

const TURNS = {
  x: '❌',
  o: '⚪'
}

const WINNER_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [turn, setTurn] = useState(TURNS.x)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null) // null means no winner and false means a tie

  const checkWinner = (board) => {
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

  const updateBoard = (index) => {
    // if position already has a value or a winner exists, do nothing
    if (board[index] || winner) return

    // update the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // update the turn
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    // check if winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  return (
    <main className='game'>
      <h1>Tic Tac Toe</h1>
      <section className="board">
        {
          board.map((value, index) => (
            <Cell
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {value}
            </Cell>
          ))
        }
      </section>
      <section className="turn">
        <Cell isSelected={turn === TURNS.x}>{TURNS.x}</Cell>
        <Cell isSelected={turn === TURNS.o}>{TURNS.o}</Cell>
      </section>
    </main>
  )
}

export default App
