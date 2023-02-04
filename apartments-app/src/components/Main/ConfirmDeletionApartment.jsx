import React from 'react'
import Modal from './Modal.jsx'

const ConfirmDeletionApartment = ({ id, onDeleteApartment, onCloseDeletionConfirmModal}) => {
  return (
    <Modal>
      <div className='flex flex-col gap-6 p-6  bg-[#19193f] text-white font-poppins rounded-md'>
        <h1 className='text-center text-4xl'>Delete Entry?</h1>
        <p className='text-center'>Are you sure you want to delete apartment "Primjer naslova apartmana"? This cannot be undone.</p>
        <div className='flex flex-row flex-wrap gap-20 items-center justify-center'>
          <button 
            onClick={() => onDeleteApartment(id)} 
            className='px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d] hover:bg-[#78137d] text-sm md:text-md lg:text-lg xl:text-xl'
          >
            Delete
          </button>
          <button 
            onClick={onCloseDeletionConfirmModal}
            className='px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#24245a] hover:bg-[#303076] text-sm md:text-md lg:text-lg xl:text-xl' 
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDeletionApartment;