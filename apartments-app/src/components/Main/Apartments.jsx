import React from 'react'

const Apartments = () => {

  const apartments = [
    { id: 1, status: 'reserved', reservedBy: 'marin', title: '2-room suite moonlightly', city: 'Zadar', rooms: 2, price: 12.45},
    { id: 2, status: 'occupied', reservedBy: 'marin', title: 'sunsihine rooms', city: 'Split', rooms: 3, price: 23.45},
    { id: 3, status: 'free', reservedBy: 'marin', title: '4-room suite moonlightly', city: 'Sibenik', rooms: 1, price: 60.45}
  ]

  const statusUnicode = {
    symbol: '&#9711;',
    colors: [
      {reserved: 'bg-red-600'},
      {occupied: 'bg-yellow-600'},
      {free: 'bg-green-600'}
    ]
  }

  return (
    <div className='flex flex-col gap-16 justify-center pt-36 px-36'>
        <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Apartments</h1>
        <table className='bg-[#374151] text-[#f6f7f9] rounded-md'>
          <thead>
            <tr className='border-b-[#23272f] border-b-[1px]'>
              <th className='py-6 px-6 bg-[#149eca]'>#</th>
              <th className='py-4 px-6'>Status</th>
              <th className='py-4 px-6'>Reserved By</th>
              <th className='py-4 px-6'>Title</th>
              <th className='py-4 px-6'>City</th>
              <th className='py-4 px-6'>Rooms</th>
              <th className='py-4 px-6'>Price</th>
              <th className='py-4 px-6'>Image</th>
              <th className='py-4 px-6'></th>
            </tr>
          </thead>
          <tbody>
            {apartments.map(apartment =>
              <tr key={apartment.id} className='border-b-[#23272f] border-b-[1px]'>
                <td className='py-2 px-6'>{apartment.id}</td>
                <td className='py-2 px-6'>{apartment.status}</td>
                <td className='py-2 px-6'>{apartment.reservedBy}</td>
                <td className='py-2 px-6'>{apartment.title}</td>
                <td className='py-2 px-6'>{apartment.city}</td>
                <td className='py-2 px-6'>{apartment.rooms}</td>
                <td className='py-2 px-6'>{apartment.price}</td>
                <td className='py-2 px-6'>
                  <img 
                    className='hover:scale-[600%] duration-200'
                    width='30' 
                    height='30' 
                    src='https://www.phillyaptrentals.com/wp-content/uploads/2020/12/apartment-building-what-makes-good-apartment-building-scaled.jpg' />
                </td>
                <td className='py-2 px-6'>
                  <button className='px-6 py-1 rounded-2xl font-semibold text-md text-[#f6f7f9] bg-[#149eca]'>Open</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='flex items-center justify-end'>
          <button
            className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#149eca]'
          >
              + Add  
          </button>
        </div>
    </div>
  )
}

export default Apartments