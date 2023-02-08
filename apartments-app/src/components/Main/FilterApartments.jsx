import React, { useState } from 'react'

const FilterApartments = ({ onFilterQueryChange, onFilterChange }) => {
  const [filter, setFilter] = useState('all')
  const [filterQuery, setFilterQuery] = useState('')

  const filterChangeHandler = e => {
    setFilter(e.target.value)
    onFilterChange(e.target.value)
  }
  const filterQueryChangeHandler = e => {
    setFilterQuery(e.target.value)
    onFilterQueryChange(e.target.value)
  }

  return (
    <>
      <select value={filter} onChange={filterChangeHandler} className="text-black">
        <option value="all">All</option>
        <option value="city">City</option>
        <option value="address">Address</option>
        <option value="title">Title</option>
      </select>
      <input type="text" value={filterQuery} onChange={filterQueryChangeHandler} className="text-black"/>
    </>
  )
}

export default FilterApartments