// eslint-disable-next-line react/prop-types
export function Cell({ children, index, isSelected, updateBoard }) {
  const cellClassName = `cell ${isSelected && "is-selected"}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={cellClassName} key={index} onClick={handleClick}>
      {children}
    </div>
  )
}
