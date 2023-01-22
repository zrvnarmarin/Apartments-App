import React from 'react'
import ArrowDown from '../../assets/DownArrow.svg'


const ApartmentsTable = ({ apartments }) => {
  return (
    <table className='bg-[#384252] text-[#f6f7f9] rounded-md'>
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
            <tr key={apartment.id} className='border-b-[#23272f] border-b-[1px] hover:bg-[#4c5a70] duration-100'>
                <td className='py-4 px-6'>{apartment.id}</td>
                <td className='py-4 px-6'>{apartment.status}</td>
                <td className='py-4 px-6'>{apartment.reservedBy}</td>
                <td className='py-4 px-6'>{apartment.title}</td>
                <td className='py-4 px-6'>{apartment.city}</td>
                <td className='py-4 px-6'>{apartment.rooms}</td>
                <td className='py-4 px-6'>{apartment.price}</td>
                <td className='py-4 px-6'>
                <img
                    className='hover:scale-[600%] duration-200'
                    width='30'
                    height='30'
                    src='https://www.phillyaptrentals.com/wp-content/uploads/2020/12/apartment-building-what-makes-good-apartment-building-scaled.jpg' />
                </td>
                <td>
                <button
                    className='px-6 py-1 rounded-2xl font-semibold text-md text-[#f6f7f9] flex items-center justify-center'
                >
                    <img height="20" width="20" src={ArrowDown} alt="Down arrow icon" />
                </button>
                </td>
            </tr>
            )}
        </tbody>
    </table>
  )
}

export default ApartmentsTable