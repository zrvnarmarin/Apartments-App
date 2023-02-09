import React from 'react';
import { apartmentsSortOptions } from '../../data/apartmentSortOptions';

const SortApartmentsSection = ({ sort, sortOrder, onSortChange, onSortOrderChange }) => {
  // console.log(sort, sortOrder)

  return (
    <div className='flex flex-row gap-4'>
      <label className='py-2 rounded-md font-semibold text-xl text-[#f6f7f9]'>Sort By</label>
      <select 
        className='px-10 py-2 rounded-md font-semibold text-xl text-[#f6f7f9] bg-[#68106d] outline-none border-none' 
        value={sort}
        onChange={onSortChange}
      >
        {apartmentsSortOptions.map(option =>
          <option key={option.label} value={option.value}>{option.label}</option>
        )}
      </select>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-2'>
          <input onChange={onSortOrderChange} value="ascending" type="radio" name="sortOrder" id='ascending' checked={sortOrder === 'ascending'} />
          <label htmlFor="ascending">Ascending</label>
        </div>
        <div className='flex flex-row gap-2'>
          <input onChange={onSortOrderChange} value="descending" type="radio" name="sortOrder" id='descending' checked={sortOrder === 'descending'} />
          <label htmlFor="descending">Descending</label>
        </div>
      </div>
    </div>
  )
}

export default SortApartmentsSection;