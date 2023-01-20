import React, { useReducer } from 'react'
import Modal from './Modal'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ACTIONS = {
  SET_TITLE: 'set title',
  SET_CITY: 'set city',
  SET_ROOMS: 'set rooms',
  SET_PRICE: 'set price',
  SET_STATUS: 'set status'
}

const apartmentReducer = (state, action) =>  {
  switch (action.type) {
    case ACTIONS.SET_TITLE: {
      return {...state, title: action.payload}
    }
    case ACTIONS.SET_CITY: {
      return {...state, city: action.payload}
    }
    case ACTIONS.SET_ROOMS: {
      return {...state, rooms: action.payload}
    }
    case ACTIONS.SET_PRICE: {
      return {...state, price: action.payload}
    }
    case ACTIONS.SET_STATUS: {
      return {...state, status: action.payload}
    }
  }
}

const AddNewApartment = ({ onModalClose }) => {
  const [state, dispatch] = useReducer(apartmentReducer, { title: '', city: '', rooms: 0, price: 0, status: 'free' })

  const setTitle = (e) => dispatch({ type: ACTIONS.SET_TITLE, payload: e.target.value })
  const setCity = e => dispatch({ type: ACTIONS.SET_CITY, payload: e.target.value })
  const setRooms = e => dispatch({ type: ACTIONS.SET_ROOMS, payload: e.target.value })
  const setPrice = e => dispatch({ type: ACTIONS.SET_PRICE, payload: e.target.value })
  const setStatus = e => dispatch({ type: ACTIONS.SET_STATUS, payload: e.target.value })

  const addNewApartment = async newApartment => {
    const response = await axios.post('https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json',
    newApartment).then(response => console.log(response))
  }

  const submitHandler = e => {
    e.preventDefault()

    const newApartment = {
      title: state.title,
      city: state.city,
      rooms: state.rooms,
      price: state.price,
      status: state.status
    }


    console.log('ovo je iy new apartmne komponente submit funkcije ' + newApartment)

    addNewApartment(newApartment)
    console.log('fomr submited')
  }

  


  return (
    <Modal>
        <section className='bg-[#374151] px-2 pt-8 pb-2 rounded-xl xs:w-3/4 sm:w-3/4  border-2 border-[#f6f7f9]'>
            <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-center'>Add New Apartment</h1>
            <form onSubmit={submitHandler} className='flex flex-col bg-[#374151] gap-12 p-2'>
                <input onChange={setTitle} className='p-2' type="text" placeholder='Title' />
                <input onChange={setCity} className='p-2' type="text" placeholder='City' />
                <input onChange={setRooms} className='p-2' type="text" placeholder='Rooms' />
                <input onChange={setPrice} className='p-2' type="text" placeholder='Price' />
                <input onChange={setStatus} className='p-2' type="text" placeholder='Status' />
                <button
                type='submit'
                  className='font-medium text-2xl px-12 py-2 rounded-lg text-[#f6f7f9] bg-[#149eca]'
                >
                  {/* <Link to="/main">Login</Link> */}
                  Add
                </button>
            </form>
            <div className=' flex items-center justify-end gap-4 p-2 pt-8'>
              <button
                onClick={onModalClose}
                className='font-medium text-2xl px-12 py-2 rounded-lg text-[#f6f7f9] bg-[#ca1414]'
              >
                <Link to="/main/apartments">Cancel</Link>
              </button>
            </div>
          </section>
    </Modal>
  )
}

export default AddNewApartment