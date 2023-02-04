import React, { useState } from 'react'
import ConfirmDeletionApartment from './ConfirmDeletionApartment';
import SummarizedInfoApartmentSection from './SummarizedInfoApartmentSection';
import MoreInfoApartmentSection from './MoreInfoApartmentSection';

const Apartment = ({ id, index, status, city, rooms, price, title, onDeleteApartment }) => {
    const [isMoreInfoSectionOpened, setIsMoreInfoSectionOpened] = useState(false)
    const toggleMoreInfoSection = () => setIsMoreInfoSectionOpened(prev => !prev)

    const [isDeleteButtonPressed, setIsDeleteButtonPressed] = useState(false)
    const closeConfirmDeletionModal = () => setIsDeleteButtonPressed(false)
    const openConfirmDeletionModal = () => setIsDeleteButtonPressed(true)

    return (
        <div 
            key={id} 
            className={`grid grid-cols-7 col-span-7 hover:bg-[#24245a] duration-100 ${ isMoreInfoSectionOpened ? 'bg-[#24245a]' : 'bg-[#19193f'} ]}`}
        >
            <SummarizedInfoApartmentSection 
                index={index} 
                status={status} 
                city={city} 
                rooms={rooms} 
                price={price} 
                isMoreInfoSectionOpened={isMoreInfoSectionOpened} 
                onToggleMoreInfoSection={toggleMoreInfoSection} 
            />

            { isMoreInfoSectionOpened && 
                <MoreInfoApartmentSection onOpenConfirmDeletionModal={openConfirmDeletionModal} />
            }

            { isDeleteButtonPressed && 
                <ConfirmDeletionApartment 
                    id={id} 
                    onDeleteApartment={onDeleteApartment} 
                    onCloseDeletionConfirmModal={closeConfirmDeletionModal} 
                /> 
            }
        </div>
    )
  }
  
  export default Apartment;