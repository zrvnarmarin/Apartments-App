import React from 'react'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return(
        <div className='fixed z-40 w-screen h-screen grid place-items-center bg-gray-900 bg-opacity-80'>
            {props.children}
        </div>
    )
}

const ModalOverlay = (props) => {
    return(
        <Backdrop>
            <div className='rounded-2xl
            px-4 sm:px-0 sm:w-1/2 z-10'>
                <div>{props.children}</div>
            </div>
        </Backdrop>
    )
}

const Modal = (props) => {
  const portalElement = document.getElementById('overlays')

  return (
    <>
        {ReactDOM.createPortal(<Backdrop />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
        portalElement)}
    </>
  )
}

export default Modal;