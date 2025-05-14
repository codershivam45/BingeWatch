'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchMoviesByName } from '@/utils/movie'
import { fetchPersonsByName } from '@/utils/person'
import { fetchTVShowsByName } from '@/utils/show'
import Loading from '@/components/Loading'
import Image from 'next/image'
import Link from 'next/link'

const SearchPage = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''

    const [movies, setMovies] = useState([])
    const [tvShows, setTvShows] = useState([])
    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('all')

    useEffect(() => {
        const searchContent = async () => {
            if (!query) return

            setLoading(true)
            try {
                const filteredMovies = await fetchMoviesByName(query, 1)
                const filteredTvShows = await fetchTVShowsByName(query, 1)
                const filteredPersons = await fetchPersonsByName(query, 1)

                setMovies(filteredMovies.data)
                setTvShows(filteredTvShows.data)
                setPersons(filteredPersons.data)
            } catch (error) {
                console.error('Error searching:', error)
            } finally {
                setLoading(false)
            }
        }

        searchContent()
    }, [query])

    const renderResults = () => {
        if (loading) return <Loading />

        if (!query) {
            return (
                <div className="text-center text-gray-400 mt-8">
                    Enter a search term to find movies, TV shows, and people
                </div>
            )
        }

        // Check if all categories are empty
        if (movies.length === 0 && tvShows.length === 0 && persons.length === 0) {
            return (
                <div className="text-center text-gray-400 mt-8">
                    No records found for &quot;{query}&quot;
                </div>
            )
        }

        // For individual tabs, show error messages if no results
        if (activeTab === 'movies' && movies.length === 0) {
            return (
                <div className="text-center text-gray-400 mt-8">
                    No movies found for &quot;{query}&quot;
                </div>
            )
        }

        if (activeTab === 'tv' && tvShows.length === 0) {
            return (
                <div className="text-center text-gray-400 mt-8">
                    No TV shows found for &quot;{query}&quot;
                </div>
            )
        }

        if (activeTab === 'people' && persons.length === 0) {
            return (
                <div className="text-center text-gray-400 mt-8">
                    No people found for &quot;{query}&quot;
                </div>
            )
        }

        return (
            <div className="space-y-8">
                {/* Movies Section - Only show in 'All' if there are results */}
                {(activeTab === 'all' && movies.length > 0) && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Movies</h2>
                        <div className="grid gap-6">
                            {movies.map((movie) => (
                                <Link href={`movie/${movie.id}-${movie.title?.replaceAll(' ', '-')}`} key={movie.id}>
                                    <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-48 h-72 md:h-auto">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="text-xl font-semibold">{movie.title}</h3>
                                            <div className="text-gray-400 text-sm mt-1">
                                                {movie.release_date} • Rating: {movie.vote_average}/10
                                            </div>
                                            <p className="text-gray-300 mt-2">{`${movie.overview.substr(0, 200)} ${(movie.overview.length > 200) ? "..." : ""}`}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* TV Shows Section - Only show in 'All' if there are results */}
                {(activeTab === 'all' && tvShows.length > 0) && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">TV Shows</h2>
                        <div className="grid gap-6">
                            {tvShows.map((show) => (
                                <Link href={`tv/${show.id}-${show.name?.replaceAll(' ', '-')}`} key={show.id}>
                                    <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-48 h-72 md:h-auto">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                                alt={show.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="text-xl font-semibold">{show.name}</h3>
                                            <div className="text-gray-400 text-sm mt-1">
                                                {show.first_air_date} • Rating: {show.vote_average}/10
                                            </div>
                                            <p className="text-gray-300 mt-2">{`${show.overview.substr(0, 200)} ${(show.overview.length > 200) ? "..." : ""}`}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* People Section - Only show in 'All' if there are results */}
                {(activeTab === 'all' && persons.length > 0) && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">People</h2>
                        <div className="grid gap-6">
                            {persons.map((person) => (
                                <Link
                                    key={person.id}
                                    href={person.id ? `/person/${person.id}-${encodeURIComponent(person.name)}` : '#'}
                                >
                                    <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-48 h-72 md:h-auto">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                                alt={person.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="text-xl font-semibold">{person.name}</h3>
                                            <div className="text-gray-400 text-sm mt-1">
                                                {person.known_for_department}
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-gray-300">Known for:</p>
                                                <ul className="list-disc list-inside text-gray-400 mt-1">
                                                    {person.known_for?.map((work, index) => (
                                                        <li key={index}>{work.title || work.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Individual tab content */}
                {activeTab === 'movies' && movies.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Movies</h2>
                        <div className="grid gap-6">
                            {movies.map((movie) => (
                                <Link href={`movie/${movie.id}-${movie.title?.replaceAll(' ', '-')}`} key={movie.id}>
                                    <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-48 h-72 md:h-auto">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="text-xl font-semibold">{movie.title}</h3>
                                            <div className="text-gray-400 text-sm mt-1">
                                                {movie.release_date} • Rating: {movie.vote_average}/10
                                            </div>
                                            <p className="text-gray-300 mt-2">{`${movie.overview.substr(0, 200)} ${(movie.overview.length > 200) ? "..." : ""}`}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'tv' && tvShows.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">TV Shows</h2>
                        <div className="grid gap-6">
                            {tvShows.map((show) => (
                                <Link href={`tv/${show.id}-${show.name?.replaceAll(' ', '-')}`} key={show.id}>
                                    <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-48 h-72 md:h-auto">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                                alt={show.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="text-xl font-semibold">{show.name}</h3>
                                            <div className="text-gray-400 text-sm mt-1">
                                                {show.first_air_date} • Rating: {show.vote_average}/10
                                            </div>
                                            <p className="text-gray-300 mt-2">{`${show.overview.substr(0, 200)} ${(show.overview.length > 200) ? "..." : ""}`}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'people' && persons.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">People</h2>
                        <div className="grid gap-6">
                            {persons.map((person) => (
                                <Link
                                    key={person.id}
                                    href={person.id ? `/person/${person.id}-${encodeURIComponent(person.name)}` : '#'}
                                >
                                    <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-48 h-72 md:h-auto">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                                alt={person.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="text-xl font-semibold">{person.name}</h3>
                                            <div className="text-gray-400 text-sm mt-1">
                                                {person.known_for_department}
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-gray-300">Known for:</p>
                                                <ul className="list-disc list-inside text-gray-400 mt-1">
                                                    {person.known_for?.map((work, index) => (
                                                        <li key={index}>{work.title || work.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            {/* Search Input */}
            <div className="max-w-4xl mx-auto mb-8">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target)
                        const searchQuery = formData.get('search')
                        if (searchQuery) {
                            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                        }
                    }}
                    className="relative"
                >
                    <input
                        type="text"
                        name="search"
                        defaultValue={query}
                        placeholder="Search for movies, TV shows, and people..."
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Filter Tabs */}
            {query && (
                <div className="max-w-4xl mx-auto mb-6">
                    <div className="flex space-x-2 text-sm sm:text-base sm:space-x-4 border-b border-gray-700">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`pb-2 px-4 ${activeTab === 'all'
                                ? 'text-blue-500 border-b-2 border-blue-500'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('movies')}
                            className={`pb-2 px-4 ${activeTab === 'movies'
                                ? 'text-blue-500 border-b-2 border-blue-500'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Movies
                        </button>
                        <button
                            onClick={() => setActiveTab('tv')}
                            className={`pb-2 px-4 ${activeTab === 'tv'
                                ? 'text-blue-500 border-b-2 border-blue-500'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            TV Shows
                        </button>
                        <button
                            onClick={() => setActiveTab('people')}
                            className={`pb-2 px-4 ${activeTab === 'people'
                                ? 'text-blue-500 border-b-2 border-blue-500'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            People
                        </button>
                    </div>
                </div>
            )}

            {/* Results */}
            <div className="max-w-7xl mx-auto">
                {renderResults()}
            </div>
        </div>
    )
}

export default SearchPage
