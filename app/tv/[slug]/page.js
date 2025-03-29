'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchTvDetails, fetchTvCast } from '@/utils/tvDetails'
import Score from '@/components/Score'
import PersonCard from '@/components/PersonCard'
import Loading from '@/components/Loading'

const TvDetails = ({ params }) => {
    const { slug } = React.use(params)
    const id = slug.split('-')[0]

    const [tvShow, setTvShow] = useState(null)
    const [cast, setCast] = useState([])
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
            const getTvDetails = async () => {
                try {
                    const res = await fetchTvDetails(id)
                    setTvShow(res)
                } catch (error) {
                    console.error('Error fetching TV show:', error.message)
                } finally {
                    setLoading(false)
                }
            }

            const getCastDetails = async () => {
                try {
                    const res = await fetchTvCast(id)
                    setCast(res)
                } catch (error) {
                    console.error('Error fetching cast:', error.message)
                }
            }

            getTvDetails()
            getCastDetails()
        }
    }, [id])

    if (loading) {
        return (
          <Loading />
        )
    }

    return (
        <div>
            {tvShow && (
                <div>
                    <section
                        className="relative flex gap-10 pl-[5vw] pr-[5vw] p-10 text-white"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvShow.backdrop_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundBlendMode: 'multiply',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent opacity-80"></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-10">
                            <div className="image flex justify-center items-center">
                                <Image
                                    alt="poster"
                                    className="rounded-xl object-cover"
                                    width={300}
                                    height={300}
                                    src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`}
                                />
                            </div>
                            <div className="text flex flex-col mt-2">
                                <h1 className="text-3xl font-semibold">
                                    {tvShow.name} <span className="text-gray-500">{` (${tvShow.first_air_date.slice(0, 4)})`}</span>
                                </h1>
                                <p>
                                    <span className="release-date">
                                        {tvShow.first_air_date.slice(0, 10).replaceAll('-', '/')} <span>{`(${tvShow.origin_country}) `}</span>
                                    </span>
                                    <span>
                                        {tvShow.genres.map((item, index) => (index === 0 ? `• ${item.name}` : `, ${item.name}`))}
                                    </span>
                                    <span>{` • ${convertMinutestoHourMinutues(tvShow.runtime)} `}</span>
                                </p>
                                <div className="flex items-center my-2 gap-2">
                                    <Score score={Math.round(tvShow.vote_average * 10)} />
                                    <span className="text-xl">User score</span>
                                </div>
                                <div>
                                    <p className="text-lg italic text-neutral-400">{tvShow.tagline}</p>
                                </div>
                                <h2 className="text-2xl my-2">Overview</h2>
                                <p>{tvShow.overview}</p>
                            </div>
                        </div>
                    </section>

                    {/* Cast Section */}
                    {cast.length > 0 && (
                        <section className="cast px-[5vw] my-4">
                            <div className="topcast">
                                <h2 className="text-2xl my-4 font-semibold">Top Billed Cast</h2>

                                {/* Cast Row */}
                                <div className="flex items-center w-[90vw] overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 gap-10">
                                    {(showFullCast ? cast : cast.slice(0, 10)).map((item, index) => (
                                        <PersonCard key={index} item={item} />
                                    ))}

                                    {cast.length > 10 && (
                                        <button
                                            onClick={() => setShowFullCast(!showFullCast)}
                                            aria-label={showFullCast ? "Show less cast" : "Show full cast"}
                                            className="flex justify-center items-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold transition-transform transform hover:scale-110"
                                        >
                                            {showFullCast ? '▲' : '▼'}
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

export default TvDetails
