import React, { useReducer, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Select  from '../UI/Select.jsx'

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

  const facilities = [
    { label: "Wi-Fi", value: 'Wi-Fi' },
    { label: "Free Parking", value: 'Free Parking' },
    { label: "TV", value: 'TV' },
    { label: "Car Rental Service", value: 'Car Rental Service' },
    { label: "Coffe Machine", value: 'Coffe Machine' },
    { label: "Refrigerator", value: 'Refrigerator' },
    { label: "Hairdryer", value: 'Hairdryer' },
    { label: "Flat-screen TV", value: 'Flat-screen TV' },
    { label: "Spa", value: 'Spa' },
    { label: "Air Conditioning", value: 'Air Conditioning' },
    { label: "Smoke Free", value: 'Smoke Free' },
    { label: "Sauna", value: 'Sauna' },
    { label: "BBQ", value: 'BBQ' },


  ]
  
  const [facility, setFacility] = useState([facilities[0]])

  const titleChangeHandler = (e) => dispatch({ type: ACTIONS.SET_TITLE, payload: e.target.value })
  const cityChangeHandler = e => dispatch({ type: ACTIONS.SET_CITY, payload: e.target.value })
  const roomsChangeHandler = e => dispatch({ type: ACTIONS.SET_ROOMS, payload: e.target.value })
  const priceChangeHandler = e => dispatch({ type: ACTIONS.SET_PRICE, payload: e.target.value })
  const descriptionChangeHandler = e => dispatch({ type: ACTIONS.SET_DESCRIPTION, payload: e.target.value })
  const addressChangeHandler = e => dispatch({ type: ACTIONS.SET_ADDRESS, payload: e.target.value })

  const addNewApartment = useCallback(async newApartment => {
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

      // onSetNewApartment(newApartment)
    })
  })

  const submitFormHandler = e => {
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

      <form onSubmit={submitFormHandler} className='grid grid-cols-1 sm:grid-cols-2 my-10  gap-12 p-2'>
        <input onChange={titleChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Title' />
        <input onChange={cityChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='City' />
        <input onChange={roomsChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Rooms' />
        <input onChange={priceChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Price' />
        <input onChange={descriptionChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Description' />
        <input onChange={addressChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Address' />
        <div className=''>
          <Select
            multiple
            options={facilities}
            value={facility}
            onChange={facility => setFacility(facility)}
          />
          <br />
          {/* <Select options={options} value={value2} onChange={o => setValue2(o)} /> */}
        </div>
        <button
          type='submit'
          className='font-medium col-span-full text-2xl px-12 py-2 rounded-md text-[#f6f7f9] bg-[#68106d]'
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddNewApartment;