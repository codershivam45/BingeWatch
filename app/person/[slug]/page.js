'use client'
import React, { useEffect, useState } from 'react'
import { fetchPersonDetails, fetchPersonCredits, fetchSocialDetails  ,fetchPersonTVCredits} from '@/utils/person'
import Image from 'next/image'
import Card from '@/components/Card'
import Loading from '@/components/Loading'
import Score from '@/components/Score'

const Person = ({ params }) => {
  const { slug } = React.use(params)
  const id = slug.split('-')[0]
  const [details, setDetails] = useState(null)
  const [credits, setCredits] = useState([])
  const [socialDetails, setSocialDetails] = useState(null)
  const [tvCredits , setTvCredits]=useState([])

  useEffect(() => {
    const getPersonDetails = async () => {
      try {
        const res = await fetchPersonDetails(id)
        const creditRes = await fetchPersonCredits(id)
        const social = await fetchSocialDetails(id)
        const tvRes=await fetchPersonTVCredits(id)
        // console.log(social)
        console.log(tvRes)
        setDetails(res)
        setCredits(creditRes.cast || [])
        setSocialDetails(social)
        setTvCredits(tvRes.cast || [])
      } catch (error) {
        console.log('Error fetching person:', error.message)
      }
    }

    getPersonDetails()
  }, [id])

  if (!details) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <Loading />
      </div>
    )
  }

  return (
    <main className="min-h-[calc(100vh-270px)] bg-gray-900 text-white">
      <div className="mx-auto w-[95vw] md:w-[85vw] overflow-hidden flex flex-col md:flex-row gap-8 p-6">
        {/* Profile Image */}
        <div className="flex md:flex-col items-center justify-center md:flex-shrink-0 md:items-start md:justify-start">
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

          {/* Personal Info */}
          <div className="mt-6 hidden md:block">
            <h2 className="text-2xl font-semibold mb-2">Personal Info</h2>
            <div className="gap-4 space-y-4">
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
              <div className="flex gap-2 items-center">
                <Score score={details.popularity * 10} />
                <h3 className="font-semibold">Popularity</h3>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          {socialDetails && (
            <div className="mt-6 hidden md:block">
              <h2 className="text-2xl font-semibold mb-4">Social Media</h2>
              <div className="flex gap-4">
                {socialDetails.instagram && (
                  <a
                    href={`https://www.instagram.com/${socialDetails.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
                {socialDetails.twitter && (
                  <a
                    href={`https://twitter.com/${socialDetails.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                )}
                {socialDetails.facebook && (
                  <a
                    href={`https://www.facebook.com/${socialDetails.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {socialDetails.imdb && (
                  <a
                    href={`https://www.imdb.com/name/${socialDetails.imdb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 3.5h21v17h-21v-17zm19.5 15.5v-14h-18v14h18zm-9-12.5h-1.5v9h1.5v-9zm-3 0h-1.5v9h1.5v-9zm6 0h-1.5v9h1.5v-9zm3 0h-1.5v9h1.5v-9z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold">{details.name}</h1>
          <p className="text-gray-400">{details.known_for_department}</p>

          {/* Biography */}
          {details.biography && (
            <div className="mt-4 md:w-[70vw]">
              <h2 className="text-2xl font-semibold mb-2">Biography</h2>
              <p className="text-gray-300 text-justify max-h-40 overflow-y-auto md:w-[67vw] pr-8">
                {details.biography}
              </p>
            </div>
          )}

          {/* Personal Info */}
          <div className="mt-6 md:hidden">
            <h2 className="text-2xl font-semibold mb-2">Personal Info</h2>
            <div className="grid grid-cols-2 gap-4 ">
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
              <div className="flex gap-2 items-center">
                <Score score={details.popularity * 10} />
                <h3 className="font-semibold">Popularity</h3>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          {socialDetails && (
            <div className="mt-6 md:hidden">
              <h2 className="text-2xl font-semibold mb-4">Social Media</h2>
              <div className="flex gap-4">
                {socialDetails.instagram && (
                  <a
                    href={`https://www.instagram.com/${socialDetails.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
                {socialDetails.twitter && (
                  <a
                    href={`https://twitter.com/${socialDetails.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                )}
                {socialDetails.facebook && (
                  <a
                    href={`https://www.facebook.com/${socialDetails.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {socialDetails.imdb && (
                  <a
                    href={`https://www.imdb.com/name/${socialDetails.imdb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 3.5h21v17h-21v-17zm19.5 15.5v-14h-18v14h18zm-9-12.5h-1.5v9h1.5v-9zm-3 0h-1.5v9h1.5v-9zm6 0h-1.5v9h1.5v-9zm3 0h-1.5v9h1.5v-9z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}




          {/* Known For Section */}
          {credits.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-2">Movies</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 md:w-[85vw] pr-80">
                {credits.slice(0, 10).map((movie, index) => (
                  <Card key={index} item={movie} />
                ))}
              </div>
            </div>
          )}
          {tvCredits.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-2">TV Shows</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 md:w-[85vw] pr-80">
                {tvCredits.slice(0, 10).map((movie, index) => (
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
