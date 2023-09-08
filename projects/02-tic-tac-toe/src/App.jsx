import { useState } from 'react'
import { Cell } from './components/Cell'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { checkWinner } from './utils/board'
import confetti from 'canvas-confetti'
import './App.css'
import { Board } from './components/Board'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage
      ? JSON.parse(boardFromLocalStorage)
      : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage
      ? JSON.parse(turnFromLocalStorage)
      : TURNS.x
  })

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

    // save current game in Local Storage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

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
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='game'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Restart</button>

      <section className='board'>
        <Board  board={board} updateBoard={updateBoard}/>
      </section>

      <section className='turn'>
        <Cell isSelected={turn === TURNS.x}>{TURNS.x}</Cell>
        <Cell isSelected={turn === TURNS.o}>{TURNS.o}</Cell>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
