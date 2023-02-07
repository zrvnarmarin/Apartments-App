import React from 'react';

const ApartmentTableHeader = () => {
  return (
    <>
        <div className='flex items-center justify-center bg-[#68106d] border-b-[#23272f] border-b-[1px] px-0 py-6 text-sm md:text-md lg:text-lg xl:text-xl whitespace-normal'>#</div>
        <div className='flex items-center justify-center border-b-[#23272f] border-b-[1px] px-0 py-1 text-sm md:text-md lg:text-lg xl:text-xl whitespace-normal'>Title</div>
        <div className='flex items-center justify-center border-b-[#23272f] border-b-[1px] px-0 py-1 text-sm md:text-md lg:text-lg xl:text-xl whitespace-normal'>Status</div>
        <div className='flex items-center justify-center border-b-[#23272f] border-b-[1px] px-0 py-1 text-sm md:text-md lg:text-lg xl:text-xl whitespace-normal'>City</div>
        <div className='flex items-center justify-center border-b-[#23272f] border-b-[1px] px-0 py-1 text-sm md:text-md lg:text-lg xl:text-xl whitespace-normal'>Rooms</div>
        <div className='flex items-center justify-center border-b-[#23272f] border-b-[1px] px-0 py-1 text-sm md:text-md lg:text-lg xl:text-xl whitespace-normal'>Price</div>
        <div className='flex items-center justify-center border-b-[#23272f] border-b-[1px] px-0 py-1 text-sm md:text-md lg:text-lg xl:text-xl  whitespace-normal'></div>
    </>
  )
}

export default ApartmentTableHeader;