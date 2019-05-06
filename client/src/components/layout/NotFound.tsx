import React from 'react'

const NotFound: React.FC = () => {
  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large'>This Page Does Not Exist</p>
    </>
  )
}

export default NotFound
