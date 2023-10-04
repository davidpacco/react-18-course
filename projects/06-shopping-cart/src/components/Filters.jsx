import { useId, useContext } from 'react'
import './Filters.css'
import { FilterContext } from '../context/filters'

export function Filters() {
  const { filter, setFilter } = useContext(FilterContext)
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleMinPriceChange = (e) => {
    const newMinPrice = e.target.value
    setFilter(prevState => ({
      ...prevState,
      minPrice: newMinPrice
    }))
  }

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value
    setFilter(prevState => ({
      ...prevState,
      category: newCategory
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Price from</label>
        <input
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleMinPriceChange}
          type="range"
          value={filter.minPrice}
        />
        <span className='range-value'>${filter.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select name="" id={categoryFilterId} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
    </section>
  )
}
