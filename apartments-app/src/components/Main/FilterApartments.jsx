import React from 'react'
import { apartmentsFilterOptions } from '../../data/apartmentsFilterOptions'

const FilterApartments = ({ filter, onFilterChange, filterQuery, onFilterQueryChange }) => {
  return (
    <div>
        <select value={filter} onChange={onFilterChange} className="text-black">
            {apartmentsFilterOptions.map(option =>
                <option key={option.label} value={option.value}>{option.label}</option>
            )}
        </select>
        <input type="text" value={filterQuery} onChange={onFilterQueryChange} className="text-black"/>
    </div>
  )
}

export default FilterApartments