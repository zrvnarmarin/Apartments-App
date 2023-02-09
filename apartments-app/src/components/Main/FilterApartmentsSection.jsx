import React, { useState, useRef, useEffect } from 'react'
import { apartmentsFilterOptions } from '../../data/apartmentsFilterOptions'

const FilterApartmentsSection = ({ filter, onFilterChange, filterQuery, onFilterQueryChange }) => {
  const [isFilterQueryVisible, setIsFilterQueryVisible] = useState(false)
  const filterQueryRef = useRef()

  useEffect(() => {
    if (filter !== 'all') {
      // filterQueryRef.current.focus()
      setIsFilterQueryVisible(true)
    } else {
      setIsFilterQueryVisible(false)
    }
  }, [filter])

  return (
    <div className='flex flex-row gap-4'>
      <label className='py-2 rounded-md font-semibold text-xl text-[#f6f7f9]'>Filter By</label>
      <select 
        className='px-10 py-2 rounded-md font-semibold text-xl text-[#f6f7f9] bg-[#68106d] outline-none border-none' 
        value={filter} 
        onChange={onFilterChange}
      >
        {apartmentsFilterOptions.map(option =>
          <option key={option.label} value={option.value}>{option.label}</option>
        )}
      </select>
      { isFilterQueryVisible && <input ref={filterQueryRef} className="p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none" type="text" value={filterQuery} onChange={onFilterQueryChange} />}
    </div>
  )
}

export default FilterApartmentsSection