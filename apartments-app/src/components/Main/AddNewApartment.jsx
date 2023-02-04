import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import axios from 'axios'

const ACTIONS = {
  SET_TITLE: 'set title',
  SET_CITY: 'set city',
  SET_ROOMS: 'set rooms',
  SET_PRICE: 'set price',
  SET_DESCRIPTION: 'set description',
  SET_ADDRESS: 'set address',
  SET_CITY: 'set city',
  SET_RESERVED_BY: 'set reserved by'
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
    case ACTIONS.SET_DESCRIPTION: {
      return {...state, description: action.payload}
    }
    case ACTIONS.SET_ADDRESS: {
      return {...state, address: action.payload}
    }
    case ACTIONS.SET_RESERVED_BY: {
      return {...state, reservedBy: action.payload}
    }
  }
}

const AddNewApartment = ({ onSetNewApartment }) => {
  const [state, dispatch] = useReducer(apartmentReducer, { title: '', city: '', rooms: 0, price: 0, status: 'free', description: '',
  address: '', city: '', reservedBy: '' })

  const setTitle = (e) => dispatch({ type: ACTIONS.SET_TITLE, payload: e.target.value })
  const setCity = e => dispatch({ type: ACTIONS.SET_CITY, payload: e.target.value })
  const setRooms = e => dispatch({ type: ACTIONS.SET_ROOMS, payload: e.target.value })
  const setPrice = e => dispatch({ type: ACTIONS.SET_PRICE, payload: e.target.value })
  const setDescription = e => dispatch({ type: ACTIONS.SET_DESCRIPTION, payload: e.target.value })
  const setAddress = e => dispatch({ type: ACTIONS.SET_ADDRESS, payload: e.target.value })

  const addNewApartment = async newApartment => {
    const response = await axios.post('https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json',
    newApartment).then(response => {
      const newApartment = {
        id: response.data.name,
        title: state.title,
        city: state.city,
        rooms: state.rooms,
        price: state.price,
        description: state.description,
        address: state.address,
        status: state.status,
      }

      onSetNewApartment(newApartment)
    })
  }

  const submitHandler = e => {
    e.preventDefault()

    const newApartment = {
      title: state.title,
      city: state.city,
      rooms: state.rooms,
      price: state.price,
      description: state.description,
      address: state.address,
      status: state.status,
      reservedBy: state.reservedBy
    }

    addNewApartment(newApartment)
  }

  return (
    <div className='flex flex-col text-white font-poppins justify-center px-4 pt-36 md:px-36'>
      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Add New Apartment</h1>

      <form onSubmit={submitHandler} className='grid grid-cols-2 my-10  gap-12 p-2'>
        <input onChange={setTitle} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Title' />
        <input onChange={setCity} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='City' />
        <input onChange={setRooms} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Rooms' />
        <input onChange={setPrice} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Price' />
        <input onChange={setDescription} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Description' />
        <input onChange={setAddress} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Address' />
        <button
          type='submit'
          className='font-medium col-span-full text-2xl px-12 py-2 rounded-md text-[#f6f7f9] bg-[#68106d]'
        >
          <Link to="/main/apartments"></Link>
          Add
        </button>
      </form>
    </div>
  )
}

export default AddNewApartment


{/*  */}