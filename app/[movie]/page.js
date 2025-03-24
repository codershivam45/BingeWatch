import React from 'react'

const page = async ({params}) => {
     const movie=(await params).movie
     console.log(movie)
  return (
    <div>
      Welcome {movie}
    </div>
  )
}

export default page
