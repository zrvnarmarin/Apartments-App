import React from 'react'

const MoreInfoApartmentSection = ({ facilities, description, address, doubleBeds, singleBeds, distanceFromTheSea, onOpenConfirmDeletionModal }) => {
  return (
    <>
        <>
            <span className='flex items-center bg-[#19193f] justify-center col-span-1 py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DESCRIPTION: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 pl-12 pr-10 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{description}</span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] justify-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>ADDRESS: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 pl-12 pr-10 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{address}</span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] justify-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DOUBLE BEDS: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 col-span-full py-2 pr-10 text-sm md:text-md lg:text-lg xl:text-xl'>{doubleBeds}</span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] justify-center col-span-1 py-2 text-sm md:text-md lg:text-lg xl:text-xl'>SINGLE BEDS: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 col-span-full py-2 pr-10 text-sm md:text-md lg:text-lg xl:text-xl'>{singleBeds}</span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] text-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DISTANCE FROM THE SEA: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 col-span-full py-2 pr-10 text-sm md:text-md lg:text-lg xl:text-xl'>{distanceFromTheSea} km </span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] justify-center text-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>FACILITIES: </span>
            <span className='flex items-center bg-[#19193f] text-center justify-end col-start-2 col-span-full py-2 pr-10 text-sm md:text-md lg:text-lg xl:text-xl'>
                {facilities.map(facility => 
                    <span key={facility.label} className='m-1 rounded-md py-1 px-2 bg-[#2f18e5]'>{facility.label}</span>
                )}
            </span>
        </>
        <>
            <span className='flex items-center gap-6 justify-end bg-[#19193f] text-center col-span-full pr-10 py-2 text-sm md:text-md lg:text-lg xl:text-xl'>
                <button className='px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d] text-sm md:text-md lg:text-lg xl:text-xl'>Change Details</button>
                <button 
                    onClick={onOpenConfirmDeletionModal}
                    className='px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d] text-sm md:text-md lg:text-lg xl:text-xl'
                >
                    Delete
                </button>
            </span>
        </>
    </>
  )
}

export default MoreInfoApartmentSection