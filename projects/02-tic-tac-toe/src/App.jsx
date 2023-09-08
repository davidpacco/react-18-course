import { useState } from 'react'
import { Cell } from './components/Cell'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { checkWinner } from './utils/board'
import confetti from 'canvas-confetti'
import './App.css'
import { Board } from './components/Board'

function App() {
  const [turn, setTurn] = useState(TURNS.x)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null) // null means no winner and false means a tie

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

    // check if winner or tie
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  return (
    <main className='game'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Restart</button>

      <section className="board">
        <Board  board={board} updateBoard={updateBoard}/>
      </section>

      <section className="turn">
        <Cell isSelected={turn === TURNS.x}>{TURNS.x}</Cell>
        <Cell isSelected={turn === TURNS.o}>{TURNS.o}</Cell>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
