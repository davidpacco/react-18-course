import { FilterValue } from "../types";
import { Filters } from "./Filters";

interface Props {
  activeCount: number,
  completedCount: number,
  filterSelected: FilterValue
  handleFilterChange: (filter: FilterValue) => void
  onClearCompleted: () => void
}

export function Footer({ activeCount = 0, completedCount = 0, filterSelected, handleFilterChange, onClearCompleted }: Props) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> pending tasks
      </span>
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />

      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  )
}
