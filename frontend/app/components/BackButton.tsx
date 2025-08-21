import Link from 'next/link'
import React from 'react'

const BackButton = () => {
  return (
    <Link
        href="/"
        className='btn btn-md '
    >
        Back
    </Link>
  )
}

export default BackButton