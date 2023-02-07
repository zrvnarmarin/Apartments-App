import React from 'react'
import DownArrow from '../../assets/DownArrow.svg'

const SummarizedInfoApartmentSection = ({ index, status, city, rooms, price, isMoreInfoSectionOpened, onToggleMoreInfoSection, title }) => {
  return (
    <>
        <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{index}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{title}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{status}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{city}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{rooms}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{price} e</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>
            <button onClick={onToggleMoreInfoSection}>
                <img className={` ${ isMoreInfoSectionOpened ? 'rotate-180' : 'rotate-0'} duration-300`} width="20" src={DownArrow} alt="arrow down" />
            </button>
        </div>
    </>
  )
}

export default SummarizedInfoApartmentSection