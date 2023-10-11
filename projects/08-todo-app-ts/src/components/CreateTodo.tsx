import React, { useState } from "react"
import { TodoTitle } from "../types"

interface Props {
  addTodo: ({ title }: TodoTitle) => void
}

export function CreateTodo({ addTodo }: Props) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        value={inputValue}
        onChange={(event) => { setInputValue(event.target.value) }}
        placeholder="Add a new task"
        autoFocus
      />
    </form>
  )
}
