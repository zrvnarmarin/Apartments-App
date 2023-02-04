import React from 'react'
import DownArrow from '../../assets/DownArrow.svg'

const SummarizedInfoApartmentSection = ({ index, status, city, rooms, price, isMoreInfoSectionOpened, onToggleMoreInfoSection}) => {
  return (
    <>
        <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{index}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{status}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{city}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{rooms}</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>{price} e</div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>
                <img
                    className='hover:scale-[600%] duration-200 inline-block'
                    width='30'
                    height='30'
                    src='https://www.phillyaptrentals.com/wp-content/uploads/2020/12/apartment-building-what-makes-good-apartment-building-scaled.jpg'
                />
            </div>
            <div className='flex items-center justify-center py-2 text-sm md:text-md lg:text-lg xl:text-xl'>
            <button onClick={onToggleMoreInfoSection}>
                <img className={` ${ isMoreInfoSectionOpened ? 'rotate-180' : 'rotate-0'} duration-300`} width="20" src={DownArrow} alt="arrow down" />
            </button>
        </div>
    </>
  )
}

export default SummarizedInfoApartmentSection