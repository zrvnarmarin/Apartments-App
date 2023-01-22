import React from 'react'
import loadingSpinner from '../../assets/LoadingSpinner.svg'

const LoadingSpinnerSection = () => {
  return (
    <div className='flex items-center justify-center'>
        <img height='50' width='50' src={loadingSpinner} />
    </div>
  )
}

export default LoadingSpinnerSection