import React from 'react'

const MoreInfoApartmentSection = ({ onOpenConfirmDeletionModal }) => {
  return (
    <>
        <>
            <span className='flex items-center bg-[#19193f] justify-center col-span-1 py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DESCRIPTION: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 pl-12 pr-10 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>Ovo je neka placeholder deskripcija koja opisuje ovaj divan i krasan apartman na moru hehe</span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] justify-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>ADDRESS: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 pl-12 pr-10 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>Ovo je neka placeholder adresa 47 000 a sss dfbfg  gfbdfg </span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] justify-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DOUBLE BEDS: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 col-span-full py-2 pr-10 text-sm md:text-md lg:text-lg xl:text-xl'>5</span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] justify-center col-span-1 py-2 text-sm md:text-md lg:text-lg xl:text-xl'>SINGLE BEDS: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 col-span-full py-2 pr-10 text-sm md:text-md lg:text-lg xl:text-xl'>2 </span>
        </>
        <>
            <span className='flex items-center bg-[#19193f] text-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DISTANCE FROM THE SEA: </span>
            <span className='flex items-center bg-[#19193f] justify-end col-start-2 col-span-full py-2 pr-10 text-sm md:text-md lg:text-lg xl:text-xl'>2.5 km </span>
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