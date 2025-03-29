'use client'
import React, { useEffect, useState } from 'react'
import { fetchPersonDetails , fetchPersonCredits } from '@/utils/person'
import Image from 'next/image'
import Card from '@/components/Card'
import Loading from '@/components/Loading'
import Score from '@/components/Score'

const Person = ({ params }) => {
  const { slug } = React.use(params)
  const id = slug.split('-')[0]
  const [details, setDetails] = useState(null)
  const [credits, setCredits] = useState([])

  useEffect(() => {
    const getPersonDetails = async () => {
      try {
        const res = await fetchPersonDetails(id)
        const creditRes = await fetchPersonCredits(id)
        setDetails(res)
        setCredits(creditRes.cast || [])
      } catch (error) {
        console.log('Error fetching person:', error.message)
      }
    }

    getPersonDetails()
  }, [id])

  if (!details) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Loading/>
      </div>
    )
  }

  return (
    <main className="min-h-screen  bg-gray-100">
      <div className=" mx-auto w-[90vw] overflow-hidden flex flex-col md:flex-row gap-8 p-6">
        {/* Profile Image */}
        <div className="flex items-center justify-center md:flex-shrink-0 md:items-start md:justify-start"> 
          <Image
            alt={details.name}
            className="rounded-lg object-cover"
            src={
              details.profile_path
                ? `https://image.tmdb.org/t/p/w500/${details.profile_path}`
                : `/no-avatar.png`
            }
            width={250}
            height={250}
          />

          {/* Social Media Icons */}
          {/* <div className="flex gap-4 mt-4 text-2xl">
            <a href={details.homepage || '#'} className="hover:text-blue-500">
              🌐
            </a>
          </div> */}
        </div>

        {/* Details Section */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold">{details.name}</h1>
          <p className="text-gray-500">{details.known_for_department}</p>

          {/* Biography */}
          {details.biography && (
            <div className="mt-4 md:w-[70vw]">
              <h2 className="text-2xl font-semibold mb-2">Biography</h2>
              <p className="text-gray-800 text-justify max-h-40 overflow-y-auto md:w-[67vw] pr-8">
                {details.biography}
              </p>
            </div>
          )}


          {/* Personal Info */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Personal Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Known For</h3>
                <p>{details.known_for_department}</p>
              </div>
              <div>
                <h3 className="font-semibold">Gender</h3>
                <p>{details.gender === 1 ? 'Female' : 'Male'}</p>
              </div>
              <div>
                <h3 className="font-semibold">Birthday</h3>
                <p>{details.birthday || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold">Place of Birth</h3>
                <p>{details.place_of_birth || 'Unknown'}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <Score score={details.popularity * 10} />
                <h3 className="font-semibold">Popularity</h3>
                {/* <p>{details.popularity.toFixed(2)}</p> */}
                
                
              </div>
            </div>
          </div>

          {/* Known For Section */}
          {credits.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-2">Known For</h2>
              <div className="flex gap-4 overflow-x-scroll pb-4 md:w-[70vw]">
                {credits.slice(0, 10).map((movie,index) => (
                  <Card key={index} item={movie} />
                ))}
              </div>
            </div>
          )}

          
        </div>
      </div>
    </main>
  )
}

export default Person
