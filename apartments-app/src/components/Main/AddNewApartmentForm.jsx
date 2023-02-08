import React, { useReducer, useState, useCallback } from 'react'
import axios from 'axios'
import Select  from '../UI/Select.jsx'
import { facilities } from '../../data/facilities.js'

const ACTIONS = {
  SET_TITLE: 'set title',
  SET_CITY: 'set city',
  SET_PRICE: 'set price',
  SET_DISTANCE_FROM_THE_SEA: 'distance from the sea',
  SET_DESCRIPTION: 'set description',
  SET_ADDRESS: 'set address',
  SET_ROOMS: 'set rooms',
  SET_SINGLE_BEDS: 'single beds',
  SET_DOUBLE_BEDS: 'double beds',
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
    case ACTIONS.SET_PRICE: {
      return {...state, price: action.payload}
    }
    case ACTIONS.SET_DISTANCE_FROM_THE_SEA: {
      return {...state, distanceFromTheSea: action.payload}
    }
    case ACTIONS.SET_DESCRIPTION: {
      return {...state, description: action.payload}
    }
    case ACTIONS.SET_ADDRESS: {
      return {...state, address: action.payload}
    }
    case ACTIONS.SET_ROOMS: {
      return {...state, rooms: action.payload}
    }
    case ACTIONS.SET_SINGLE_BEDS: {
      return {...state, singleBeds: action.payload}
    }
    case ACTIONS.SET_DOUBLE_BEDS: {
      return {...state, doubleBeds: action.payload}
    }
  }
}

const AddNewApartmentForm = ({ onSetNewApartment }) => {
  const [state, dispatch] = useReducer(apartmentReducer, { title: '', city: '', rooms: '', price: '', status: 'free', description: '',
  address: '', city: '', distanceFromTheSea: '', singleBeds: '', doubleBeds: '' })

  const [facility, setFacility] = useState([facilities[0]])

  const titleChangeHandler = (e) => dispatch({ type: ACTIONS.SET_TITLE, payload: e.target.value })
  const cityChangeHandler = e => dispatch({ type: ACTIONS.SET_CITY, payload: e.target.value })
  const priceChangeHandler = e => dispatch({ type: ACTIONS.SET_PRICE, payload: e.target.value })
  const distanceFromTheSeaChangeHandler = e => dispatch({ type: ACTIONS.SET_DISTANCE_FROM_THE_SEA, payload: e.target.value })
  const descriptionChangeHandler = e => dispatch({ type: ACTIONS.SET_DESCRIPTION, payload: e.target.value })
  const addressChangeHandler = e => dispatch({ type: ACTIONS.SET_ADDRESS, payload: e.target.value })
  const roomsChangeHandler = e => dispatch({ type: ACTIONS.SET_ROOMS, payload: e.target.value })
  const singleBedsChangeHandler = e => dispatch({ type: ACTIONS.SET_SINGLE_BEDS, payload: e.target.value })
  const doubleBedsChangeHandler = e => dispatch({ type: ACTIONS.SET_DOUBLE_BEDS, payload: e.target.value })

  const addNewApartment = useCallback(async newApartment => {
    const response = await axios.post('https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json',
    newApartment)
    // .then(response => {
    //   const newApartment = {
    //     title: state.title,
    //     city: state.city,
    //     price: state.price,
    //     distanceFromTheSea: state.distanceFromTheSea,
    //     description: state.description,
    //     address: state.address,
    //     rooms: state.rooms,
    //     singleBeds: state.singleBeds,
    //     doubleBeds: state.doubleBeds,
    //     status: state.status
    //     // id: response.data.name,
    //   }

    //   // onSetNewApartment(newApartment)
    // })
  })

  const submitFormHandler = e => {
    e.preventDefault()

    const newApartment = {
      title: state.title,
      city: state.city,
      price: state.price,
      distanceFromTheSea: state.distanceFromTheSea,
      rooms: state.rooms,
      description: state.description,
      address: state.address,
      status: state.status,
      singleBeds: state.singleBeds,
      doubleBeds: state.doubleBeds,
      facilities: facility
    }

    // console.log(newApartment)

    addNewApartment(newApartment)
  }

  

  return (
    <div className='flex flex-col text-white font-poppins justify-center px-4 pt-36 md:px-36'>
      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Add New Apartment</h1>

      <form onSubmit={submitFormHandler} className='grid grid-cols-1 sm:grid-cols-2 my-10  gap-12 p-2'>
        <input onChange={titleChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Title' />
        <input onChange={cityChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='City' />
        <input onChange={priceChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Price' />
        <input onChange={distanceFromTheSeaChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Distance From The Sea' />
        <input onChange={descriptionChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Description' />
        <input onChange={addressChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Address' />
        <div className=''>
          <Select
            multiple
            name={'Facilities'}
            options={facilities}
            value={facility}
            onChange={facility => setFacility(facility)}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 sm:gap-4  gap-12'>
          <input onChange={roomsChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Rooms' />
          <input onChange={singleBedsChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Single Beds' />
          <input onChange={doubleBedsChangeHandler} className='p-2 bg-[#19193f] focus:bg-[#24245a] rounded-md outline-none' type="text" placeholder='Double Beds' />
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

export default AddNewApartmentForm;