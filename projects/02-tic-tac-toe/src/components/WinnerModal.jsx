import { Cell } from "./Cell"

// eslint-disable-next-line react/prop-types
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null

  const resultText = winner === false ? 'Tie' : 'Winner:'

  return (
    <section className="winner">
      <div className="modal">
        <h2>{resultText}</h2>
        <div className="win">
          {winner && <Cell>{winner}</Cell>}
        </div>
        <div>
          <button onClick={resetGame}>Restart</button>
        </div>
      </div>
    </section>
  )
}
