import { createContext, useState } from "react";

export const FilterContext = createContext()

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FilterContext.Provider value={{
      filter,
      setFilter
    }}>
      {children}
    </FilterContext.Provider>
  )
}