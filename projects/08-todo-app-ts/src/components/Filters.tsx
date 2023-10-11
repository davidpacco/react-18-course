import { FILTER_BUTTONS } from "../consts"
import { FilterValue } from "../types"

interface Props {
  filterSelected: FilterValue
  onFilterChange: (filter: FilterValue) => void
}

export function Filters({ filterSelected, onFilterChange }: Props) {
  return (
    <ul className="filters">
      {Object.entries(FILTER_BUTTONS).map(([key, { href, literal }]) => {
        return (
          <li key={key}>
            <a
              className={`${filterSelected === key ? 'selected' : ''}`}
              href={href}
              onClick={(event) => {
                event.preventDefault()
                onFilterChange(key as FilterValue)
              }}
            >
              {literal}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
