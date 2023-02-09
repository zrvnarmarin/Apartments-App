import React, { useState } from 'react'
import FreeStatusIcon from '../../assets/FreeStatusIcon.png'
import DownArrow from '../../assets/DownArrow.svg'
import ConfirmDeletionApartment from './ConfirmDeletionApartment'

const MobileVersionApartment = ({ id, city, rooms, price, onDeleteApartment, address, description, distanceFromTheSea, doubleBeds, singleBeds, status, title, facilities }) => {
  const [isRotatedButton, setIsRotatedButton] = useState(false)
  const toggleButtonRotation = () => setIsRotatedButton(prev => !prev)

  const [isDeleteButtonPressed, setIsDeleteButtonPressed] = useState(false)
  const closeConfirmDeletionModal = () => setIsDeleteButtonPressed(false)
  const openConfirmDeletionModal = () => setIsDeleteButtonPressed(true)

  return (
    <div key={id} className={`${ isRotatedButton ? 'bg-[#24245a]' : 'bg-[#19193f]'} hover:bg-[#24245a] text-xs ss:text-sm flex flex-col gap-2 rounded-xl p-4`}>
        <div className="flex items-center justify-center text-xl text-center">
            <span>{title}</span>
        </div>

        <div className="flex items-center justify-between">
            <span>STATUS: </span>
            <span>
            <img className="inline-block" width="20" src={FreeStatusIcon} />
            </span>
        </div>

        <div className="flex items-center justify-between">
            <span>CITY:</span>
            <span>{city}</span>
        </div>

        <div className="flex items-center justify-between">
            <span>ROOMS: </span>
            <span>{rooms}</span>
        </div>

        <div className="flex items-center justify-between">
            <span>PRICE: </span>
            <span className="bg-[#68106d] px-4 py-1 rounded-md">{price} e</span>
        </div>

        { isRotatedButton && 
            <div className="flex flex-col gap-2 rounded-xl">
            <div className="flex items-center justify-between">
                <span>DESCRIPTION: </span>
                <span className="xs:overflow-x-auto">{description}</span>
            </div>
            <div className="flex items-center justify-between">
                <span>ADDRESS:</span>
                <span>{address}</span>
            </div>
            <div className="flex items-center justify-between">
                <span>SINGLE BEDS: </span>
                <span className="">{singleBeds}</span>
            </div>
            <div className="flex items-center justify-between">
                <span>DOUBLE BEDS: </span>
                <span className="">{doubleBeds}</span>
            </div>
            <div className="flex items-center justify-between">
                <span>DISTANCE FROM THE SEA: </span>
                <span className="bg-[#68106d] px-4 py-1 rounded-md">{distanceFromTheSea} km</span>
            </div>
            <div className="flex items-center justify-between">
                <span>FACILITIES: </span>
                <span className="flex flex-row gap-1">
                    {facilities.map(facility => 
                        <span className='bg-[#2f18e5] px-4 py-1 rounded-md' key={facility.label}>
                            {facility.label}
                        </span>
                    )}
                </span>
            </div>
            <div className='flex flex-col xs:flex-row gap-4 text-center col-span-full pt-12'>
                <button className='w-full px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d] '>Change Details</button>
                <button 
                onClick={openConfirmDeletionModal} 
                className='w-full px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d]'
                >
                Delete
                </button>
            </div>
            </div>
        }

        { isDeleteButtonPressed && 
            <ConfirmDeletionApartment 
                id={id} 
                onDeleteApartment={onDeleteApartment} 
                onCloseDeletionConfirmModal={closeConfirmDeletionModal} 
            /> 
        }

        <div className="flex items-center justify-center pt-4">
            <button 
                onClick={toggleButtonRotation}
                className={`${isRotatedButton ? 'rotate-180' : 'rotate-0'} sm:hidden duration-300`} 
            >
            <img width="20" src={DownArrow} alt="Arrow image" />
            </button>
        </div>
    </div> 
  )
}

export default MobileVersionApartment