import React from 'react'
import { apartmentsFilterOptions } from '../../data/apartmentsFilterOptions'

const FilterApartments = ({ filter, onFilterChange, filterQuery, onFilterQueryChange }) => {
  return (
    <div className='flex flex-row gap-2'>
      <select 
        className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#68106d] outline-none border-none' 
        value={filter} 
        onChange={onFilterChange}
      >
        {apartmentsFilterOptions.map(option =>
          <option key={option.label} value={option.value}>{option.label}</option>
        )}
      </select>
      <input className="p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none" type="text" value={filterQuery} onChange={onFilterQueryChange} />
    </div>
  )
}

export default FilterApartments