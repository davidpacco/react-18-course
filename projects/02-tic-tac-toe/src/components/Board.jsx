/* eslint-disable react/prop-types */
import { Cell } from "./Cell"

export function Board({ board, updateBoard }) {
  return (
    <>
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
    </>
  )
}
