import React from 'react'
import Modal from './Modal'

const AddNewApartment = ({ onModalClose }) => {
  return (
    <Modal>
        <section className='bg-[#374151] px-2 pt-8 pb-2 rounded-xl xs:w-3/4 sm:w-3/4  border-2 border-[#f6f7f9]'>
            <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-center'>Add New Apartment</h1>
            <form className='flex flex-col bg-[#374151] gap-12 p-2'>
                <input className='p-2' type="text" placeholder='Title' />
                <input className='p-2' type="text" placeholder='City' />
                <input className='p-2' type="text" placeholder='Rooms' />
                <input className='p-2' type="text" placeholder='Price' />
            </form>
            <div className=' flex items-center justify-end gap-4 p-2 pt-8'>
              <button
                className='font-medium text-2xl px-12 py-2 rounded-lg text-[#f6f7f9] bg-[#149eca]'
              >
                {/* <Link to="/main">Login</Link> */}
                Add
              </button>
              <button
                onClick={onModalClose}
                className='font-medium text-2xl px-12 py-2 rounded-lg text-[#f6f7f9] bg-[#ca1414]'
              >
                {/* <Link to="/main">Login</Link> */}
                Cancel
              </button>
            </div>
          </section>
    </Modal>
  )
}

export default AddNewApartment