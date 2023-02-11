import React from 'react'
import { useSelector } from 'react-redux'

const Facilities = () => {
  const apartmentFacilities = useSelector(state => state.facilities)
  console.log('hej iz fasilitisa', apartmentFacilities)
  return (
    <div className='flex flex-col text-white font-poppins justify-center px-4 pt-24 md:px-36'>
      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Facilities</h1>
      {JSON.stringify(apartmentFacilities)}
    </div>
  )
}

export default Facilities