import React, { useState, useEffect, useMemo, useCallback } from 'react'
import axios from 'axios';
import LoadingSpinnerSection from './LoadingSpinnerSection';
import Apartment from './Apartment';
import ApartmentTableHeader from './ApartmentTableHeader';
import MobileVersionApartment from './MobileVersionApartment';
import FoundNoApartmentSection from './FoundNoApartmentSection.jsx'
import AddApartmentSection from './AddApartmentSection';
import FilterApartmentsSection from './FilterApartmentsSection';
import SortApartmentsSection from './SortApartmentsSection';

const Apartments = () => {
  const [apartments, setApartments] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [filterQuery, setFilterQuery] = useState('')
  const [sort, setSort] = useState('price')
  const [sortOrder, setSortOrder] = useState('ascending')
  
  const filterChangeHandler = e => setFilter(e.target.value)
  const filterQueryChangeHandler = e => setFilterQuery(e.target.value)

  const sortChangeHandler = e => setSort(e.target.value)
  const sortOrderChangeHandler = e => setSortOrder(e.target.value)

  let errorContent = !isLoading && error && <p>{error}</p>
  let noApartmentContent = !isLoading && apartments.length === 0 && <FoundNoApartmentSection />
  let loadingContent = isLoading && <LoadingSpinnerSection />

  const filteredApartments = useMemo(() => {
    return apartments.filter(apartment => {
      if (filter === 'all') {
        return apartments;
      }
      else if (filter === 'title') {
        return apartment.title.toLowerCase().includes(filterQuery.toLowerCase());
      }
      else if (filter === 'address') {
        return apartment.address.toLowerCase().includes(filterQuery.toLowerCase());
      } 
      else if (filter === 'city') {
        return apartment.city.toLowerCase().includes(filterQuery.toLowerCase());
      } 
      else {
        return apartments;
      }
    });
  }, [apartments, filter, filterQuery]);

  const deleteApartment = async id => {
    await axios.delete(`https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments/${id}.json`)
    
    setApartments(apartments.filter(apartment => apartment.id !== id))
  }

  const fetchApartments = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get('https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json')
    
      const data = await response.data

      const loadedApartments = []

      for (let key in data) {
        loadedApartments.push({
          address: data[key].address,
          description: data[key].description,
          distanceFromTheSea: data[key].distanceFromTheSea,
          doubleBeds: data[key].doubleBeds,
          singleBeds: data[key].singleBeds,
          id: key,
          status: data[key].status,
          title: data[key].title,
          city: data[key].city,
          rooms: data[key].rooms,
          price: data[key].price,
          facilities: data[key].facilities
        })
      }

      if (sort === 'price' && sortOrder === 'ascending') 
      {
        loadedApartments.sort((a, b) => a.price - b.price)
      }

      setApartments(loadedApartments)
    } catch (error) { 
      setError(error.message) 
    }
    setIsLoading(false)
  }

  const sortByPriceAscending = useCallback(() => {
    const copy = [...apartments]
    copy.sort((a, b) => a.price - b.price)
    setApartments(copy)
  })

  const sortByPriceDescending = useCallback(() => {
    const copy = [...apartments]
    copy.sort((a, b) => b.price - a.price)
    setApartments(copy)
  })

  const sortByRoomsAscending = useCallback(() => {
    const copy = [...apartments]
    copy.sort((a, b) => a.rooms - b.rooms)
    setApartments(copy)
  })

  const sortByRoomsDescending = useCallback(() => {
    const copy = [...apartments]
    copy.sort((a, b) => b.rooms - a.rooms)
    setApartments(copy)
  })

  const sortByIdIndexDescending = () => {
    const copy = [...apartments]
    copy.sort((a, b) => b.id - a.id)
    setApartments(copy)
  }

  const sortByIdIndexAscending = () => {
    const copy = [...apartments]
    copy.sort((a, b) => a.id - b.id)
    setApartments(copy)
  }

  useEffect(() => {
    fetchApartments()
  }, [])

  useEffect(() => {
    if (sort === 'price' && sortOrder === 'ascending') {
      sortByPriceAscending()
    }

    if (sort === 'price' && sortOrder === 'descending') {
      sortByPriceDescending()
    }

    if (sort === 'rooms' && sortOrder === 'ascending') {
      sortByRoomsAscending()
    }

    if (sort === 'rooms' && sortOrder === 'descending') {
      sortByRoomsDescending()
    }

    if (sort === 'id' && sortOrder === 'ascending') {
      sortByIdIndexAscending()
    }

    if (sort === 'id' && sortOrder === 'descending') {
      sortByIdIndexDescending()
    }

  }, [sort, sortOrder])

  apartments.map(ap => console.log(ap.facilities))

  return (
    <div className='flex flex-col text-white font-poppins justify-center px-4 pt-24 md:px-36'>

      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Apartments</h1>
      { !isLoading && 
        <div className='flex flex-col lg:flex-row items-start lg:justify-between my-10'>
          <div className='flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-16 flex-wrap'>
            <FilterApartmentsSection
              filter={filter}
              filterQuery={filterQuery}
              onFilterChange={filterChangeHandler}
              onFilterQueryChange={filterQueryChangeHandler}
            />
            <SortApartmentsSection
              sort={sort}
              sortOrder={sortOrder}
              onSortChange={sortChangeHandler} 
              onSortOrderChange={sortOrderChangeHandler}
            />
          </div>
          <AddApartmentSection />
        </div> 
      }

      { noApartmentContent }
      { loadingContent }
      { errorContent }

      <div className='hidden sm:block'>
        <ApartmentTableHeader />
        { filteredApartments.map((apartment, index) =>
          <Apartment
            key={apartment.id}
            address={apartment.address}
            description={apartment.description}
            distanceFromTheSea={apartment.distanceFromTheSea}
            doubleBeds={apartment.doubleBeds}
            singleBeds={apartment.singleBeds}
            status={apartment.status}
            title={apartment.title}
            index={index + 1}
            id={apartment.id}
            city={apartment.city}
            rooms={apartment.rooms}
            price={apartment.price}
            facilities={apartment.facilities}
            onDeleteApartment={deleteApartment}
          />
        )}
      </div>

      <div className='flex flex-col gap-4 sm:hidden'>
        { filteredApartments.map(apartment => 
          <MobileVersionApartment 
            key={apartment.id}
            address={apartment.address}
            description={apartment.description}
            distanceFromTheSea={apartment.distanceFromTheSea}
            doubleBeds={apartment.doubleBeds}
            singleBeds={apartment.singleBeds}
            status={apartment.status}
            title={apartment.title}
            id={apartment.id}
            city={apartment.city}
            rooms={apartment.rooms}
            price={apartment.price}
            facilities={apartment.facilities}
            onDeleteApartment={deleteApartment}
          />
        )}
      </div>

    </div>
  )
}

export default Apartments;

