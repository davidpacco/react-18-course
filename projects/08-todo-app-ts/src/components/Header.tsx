import { TodoTitle } from "../types"
import { CreateTodo } from "./CreateTodo"

interface Props {
  onAddTodo: (title: TodoTitle) => void
}

export function Header({ onAddTodo }: Props) {
  return (
    <header className="header">
      <h1>todo</h1>
      <CreateTodo addTodo={onAddTodo} />
    </header>
  )
}
