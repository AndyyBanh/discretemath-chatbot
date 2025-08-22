import Link from 'next/link'
import React from 'react'

const BackButton = () => {
  return (
    <Link
        href="/"
        className='btn btn-md btn-neutral transition duration-300 ease-in-out hover:scale-110'
    >
        Back
    </Link>
  )
}

export default BackButton