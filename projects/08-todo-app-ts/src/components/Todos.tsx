import type { TodoId, TodoList, TodoType } from "../types"
import { Todo } from "./Todo"

interface Props {
  todos: TodoList
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export function Todos({ todos, onRemoveTodo, onToggleCompleted }: Props) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={`${todo.completed ? 'completed' : ''}`}
        >
          <Todo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleted={onToggleCompleted}
          />
        </li>
      ))}
    </ul>
  )
}
