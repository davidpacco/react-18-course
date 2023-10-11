import { useState } from "react"
import { Todos } from "./components/Todos"
import type { TodoType, TodoId, FilterValue, TodoTitle } from "./types"
import { Footer } from "./components/Footer"
import { TODO_FILTERS } from "./consts"
import { Header } from "./components/Header"

const defaultTodos = [
  {
    id: '1',
    title: 'Task 1',
    completed: true
  },
  {
    id: '2',
    title: 'Task 2',
    completed: false
  },
  {
    id: '3',
    title: 'Task 3',
    completed: false
  },
]

function App() {
  const [todos, setTodos] = useState(defaultTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleComplete = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter)
  }

  const handleRemoveCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onToggleCompleted={handleComplete}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleRemoveCompleted}
      />
    </div>
  )
}

export default App
