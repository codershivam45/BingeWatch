'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchMovieDetails, fetchCast } from '@/utils/movieDetails'
import Score from '@/components/Score'
import PersonCard from '@/components/PersonCard'
import Loading from '@/components/Loading'
import Card from '@/components/Card'

const MovieDetails = ({ params }) => {
  const { slug } = React.use(params)
  const id = slug.split('-')[0]

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [trailers, setTrailers] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [reviews, setReviews] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [showFullCast, setShowFullCast] = useState(false)
  const [loading, setLoading] = useState(true)

  const convertMinutestoHourMinutues = (time) => {
    const hours = Math.floor(time / 60)
    const minutes = time % 60
    if (hours && minutes) return `${hours}h ${minutes}m`
    if (hours) return `${hours}h`
    return `${minutes}m`
  }

  useEffect(() => {
    if (id) {
      const getMovieDetails = async () => {
        try {
          const [
            movieData,
            castData,
            trailersData,
            similarData,
            reviewsData,
            recommendationsData
          ] = await Promise.all([
            fetchMovieDetails(id),
            fetchCast(id),

          ])

          setMovie(movieData)
          setCast(castData.cast)

        } catch (error) {
          console.error('Error fetching data:', error.message)
        } finally {
          setLoading(false)
        }
      }

      getMovieDetails()
    }
  }, [id])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-gray-900 text-white">
      {movie && (
        <div>
          <section
            className="relative flex gap-10 pl-[5vw] pr-[5vw] p-10  text-white"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top 25% center',
              backgroundBlendMode: 'multiply',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent opacity-80"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-10">
              <div className="image flex items-center justify-center">
                <Image
                  alt="poster"
                  className="rounded-xl object-cover"
                  width={300}
                  height={300}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              </div>
              <div className="text flex flex-col mt-2">
                <h1 className="text-3xl font-semibold">
                  {movie.title} <span className="text-gray-400">{` (${movie.release_date.slice(0, 4)})`}</span>
                </h1>
                <p>
                  <span className="release-date">
                    {movie.release_date.slice(0, 10).replaceAll('-', '/')} <span>{`(${movie.origin_country}) `}</span>
                  </span>
                  <span>
                    {movie.genres.map((item, index) => (index === 0 ? `• ${item.name}` : `, ${item.name}`))}
                  </span>
                  <span>{` • ${convertMinutestoHourMinutues(movie.runtime)} `}</span>
                </p>
                <div className="flex items-center my-2 gap-2">
                  <Score score={Math.round(movie.vote_average * 10)} />
                  <span className="text-xl">User score</span>
                </div>
                <div>
                  <p className="text-lg italic text-neutral-400">{movie.tagline}</p>
                </div>
                <h2 className="text-2xl my-2">Overview</h2>
                <p className="text-neutral-300">{movie.overview}</p>
              </div>
            </div>
          </section>

          {/* Cast Section */}
          {cast.length > 0 && (
            <section className="cast px-[5vw] mt-4">
              <div className="topcast">
                <h2 className="text-2xl my-4 font-semibold">Top Billed Cast</h2>

                {/* Cast Row */}
                <div className="flex items-center w-[90vw] overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 gap-10">
                  {(showFullCast ? cast : cast.slice(0, 10)).map((item, index) => (
                    <PersonCard key={index} item={item} />
                  ))}

                  {cast.length > 10 && (
                    <button
                      onClick={() => setShowFullCast(!showFullCast)}
                      className="flex items-center justify-center  p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transform transition-transform duration-300 ${showFullCast ? 'rotate-180' : ''}`}
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          
        </div>
      )}
    </div>
  )
}

export default MovieDetails
