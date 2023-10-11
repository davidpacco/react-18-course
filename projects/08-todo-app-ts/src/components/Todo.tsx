import type { TodoId, TodoType } from "../types"

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export function Todo({ id, title, completed, onRemoveTodo, onToggleCompleted }: Props) {
  return (
    <div className="view">
      <input
        checked={completed}
        className="toggle"
        onChange={(event) => onToggleCompleted({ id, completed: event.target.checked })}
        type="checkbox"
      />
      <label>{title}</label>
      <button
        className="destroy"
        onClick={() => onRemoveTodo({ id })}
      />
    </div>
  )
}
