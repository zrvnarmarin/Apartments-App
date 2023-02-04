import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import DownArrow from '../../assets/DownArrow.svg'

const Apartment = ({ id, index, status, city, rooms, price }) => {
    const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false)
    const toggleMoreInfoSection = () => setIsMoreInfoOpen(prev => !prev)

    return (
        <div 
            key={id} 
            className={`grid grid-cols-7 col-span-7 hover:bg-[#24245a]  duration-100 ${ isMoreInfoOpen ? 'bg-[#24245a]' : 'bg-[#19193f'} ]}`}
        >
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
          <button onClick={toggleMoreInfoSection}>
            <img className={` ${ isMoreInfoOpen ? 'rotate-180' : 'rotate-0'} duration-300`} width="20" src={DownArrow} alt="arrow down" />
          </button>
        </div>
        
        { isMoreInfoOpen && 
         <>
            <>
                <span className='flex items-center bg-[#19193f] justify-center col-span-1 py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DESCRIPTION: </span>
                <span className='flex items-center bg-[#19193f] justify-center col-start-2 pl-12 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>Ovo je neka placeholder deskripcija koja opisuje ovaj divan i krasan apartman na moru hehe</span>
            </>
            <>
                <span className='flex items-center bg-[#19193f] justify-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>ADDRESS: </span>
                <span className='flex items-center bg-[#19193f] justify-center col-start-2 pl-12 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>Ovo je neka placeholder adresa 47 000 a sss dfbfg  gfbdfg </span>
            </>
            <>
                <span className='flex items-center bg-[#19193f] justify-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DOUBLE BEDS: </span>
                <span className='flex items-center bg-[#19193f] justify-center col-start-2 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>5</span>
            </>
            <>
                <span className='flex items-center bg-[#19193f] justify-center col-span-1 py-2 text-sm md:text-md lg:text-lg xl:text-xl'>SINGLE BEDS: </span>
                <span className='flex items-center bg-[#19193f] justify-center col-start-2 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>2 </span>
            </>
            <>
                <span className='flex items-center bg-[#19193f] text-center col-span-1  py-2 text-sm md:text-md lg:text-lg xl:text-xl'>DISTANCE FROM THE SEA: </span>
                <span className='flex items-center bg-[#19193f] justify-center col-start-2 col-span-full py-2 text-sm md:text-md lg:text-lg xl:text-xl'>2.5 km </span>
            </>
            <>
                <span className='flex items-center gap-6 justify-end bg-[#19193f] text-center col-span-full pr-10 py-2 text-sm md:text-md lg:text-lg xl:text-xl'>
                    <button className='px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d] text-sm md:text-md lg:text-lg xl:text-xl'>Change Details</button>
                    <button className='px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d] text-sm md:text-md lg:text-lg xl:text-xl'>Delete</button>
                </span>
            </>
         </>
        }
      </div>
    )
  }
  
  export default Apartment;