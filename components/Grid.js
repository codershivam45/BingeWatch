'use client'
import React from 'react'
import Loading from './Loading'
import Card from './Card'
import CardSmall from './CardSmall'
import { useState, useCallback, useEffect } from 'react'

const Grid = ({ fetchFunction }) => {
    const [loading, setLoading] = useState(false)
    const [items, setitems] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageInput, setPageInput] = useState('')
    const [selectedValue, setSelectedValue] = useState('all')
    const [filteredData, setfilteredData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState('popularity')

    const getData = useCallback(async (page) => {
        try {
            setLoading(true)
            const res = await fetchFunction(page)
            console.log(res)
            setitems(res.data)
            setfilteredData(res.data) // Set both items and filtered data initially
            setTotalPages(res.total_pages)
            setSelectedValue('all') // Reset the filter selection to "all"
            setSearchQuery('')
            setSortOption('popularity')
            setLoading(false)
        } catch (error) {
            console.error('Error fetching movies:', error.message)
            setLoading(false) // Ensure loading is false if there's an error
        }
    }, [fetchFunction])

    useEffect(() => {
        getData(page)
    }, [page, getData])

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }

    const onInputChange = (e) => {
        const value = e.target.value
        if (/^\d*$/.test(value)) {
            setPageInput(value)
        }
    }

    const onInputSubmit = (e) => {
        e.preventDefault()
        const pageNum = parseInt(pageInput)
        if (pageNum >= 1 && pageNum <= totalPages) {
            handlePageChange(pageNum)
            setPageInput('') // Reset page input after submission
        }
    }

    const handleSelect = (e) => {
        const selected = e.target.value
        setSelectedValue(selected)

        if (selected === 'all') {
            setfilteredData(items) // Show all items when "All" is selected
        } else {
            const filtered = items.filter(item => item.genre_ids.includes(parseInt(selected)))
            setfilteredData(filtered) // Filter by selected genre
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = items.filter(item => {
            // Check if it's a movie or a show and filter accordingly
            const searchText = item.title ? item.title.toLowerCase() : item.name.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });


        setfilteredData(filtered);
    };

    const handleSort = (e) => {
        const option = e.target.value;
        setSortOption(option);

        const sorted = [...filteredData].sort((a, b) => {
            if (option === 'popularity') {
                return b.popularity - a.popularity;
            } else if (option === 'rating') {
                return b.vote_average - a.vote_average;
            } else if (option === 'release') {
                // Check if release_date exists; if not, use first_air_date
                const releaseDateA = a.release_date || a.first_air_date;
                const releaseDateB = b.release_date || b.first_air_date;

                return new Date(releaseDateB) - new Date(releaseDateA);
            }
            return 0;
        });

        setfilteredData(sorted);
    };

    const renderPagination = () => {
        const pages = []
        let startPage = Math.max(1, page - 1)
        let endPage = Math.min(totalPages, page + 1)

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-gray-700 backdrop-blur-sm text-sm sm:text-base ${i === page
                        ? 'bg-red-600 text-white scale-110 shadow-xl border-red-500'
                        : 'bg-gray-800/50 text-white hover:bg-gray-700'
                        }`}
                >
                    {i}
                </button>
            )
        }

        return pages
    }

    return (
        <>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-800 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Search Input */}
                    <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 text-sm sm:text-base"
                        />
                    </div>

                    {/* Genre Filter */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </div>
                        <select onChange={handleSelect} value={selectedValue} className="w-full h-12 pl-10 pr-10 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base appearance-none">
                            <option value="all">All Genres</option>
                            <option value="28">Action</option>
                            <option value="12">Adventure</option>
                            <option value="16">Animation</option>
                            <option value="35">Comedy</option>
                            <option value="80">Crime</option>
                            <option value="18">Drama</option>
                            <option value="10751">Family</option>
                            <option value="14">Fantasy</option>
                            <option value="27">Horror</option>
                            <option value="10402">Music</option>
                            <option value="9648">Mystery</option>
                            <option value="10749">Romance</option>
                            <option value="878">Sci-Fi</option>
                            <option value="53">Thriller</option>
                        </select>
                    </div>

                    {/* Sort Filter */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M3 6h7m-7 8h5m4 2l3 3 3-3m-6 0h6" />
                            </svg>
                        </div>
                        <select onChange={handleSort} value={sortOption} className="w-full h-12 pl-10 pr-10 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base appearance-none">
                            <option value="popularity">Sort by Popularity</option>
                            <option value="rating">Sort by Rating</option>
                            <option value="release">Sort by Release Date</option>
                        </select>
                    </div>

                </div>
            </div>
            {
                loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Loading />
                    </div>
                ) : (
                    <>
                        {filteredData.length === 0 ? (
                            <div className="flex justify-center items-center h-48">
                                <p className="text-white text-lg">No records found</p>
                            </div>
                        ) : (
                            <div className="w-[90vw] place-items-center sm:w-[80vw] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                                {filteredData.map((item, index) => (
                                    <div key={index}>
                                        <div className="hidden md:block transform transition duration-300 hover:scale-105 hover:z-10">
                                            <Card item={item} />
                                        </div>
                                        <div className="block md:hidden transform transition duration-300 hover:scale-105 hover:z-10 mb-4">
                                            <CardSmall item={item} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Section */}
                        <div className="flex flex-col items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg border border-gray-700 backdrop-blur-sm"
                                >
                                    ←
                                </button>
                                <div className="flex items-center gap-1 sm:gap-2">{renderPagination()}</div>
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg border border-gray-700 backdrop-blur-sm"
                                >
                                    →
                                </button>
                            </div>

                            {/* Page input */}
                            <form onSubmit={onInputSubmit} className="flex items-center gap-2 sm:gap-3">
                                <input
                                    type="text"
                                    value={pageInput}
                                    onChange={onInputChange}
                                    placeholder="Go to page"
                                    className="w-24 sm:w-28 h-10 sm:h-12 px-3 sm:px-4 rounded-xl bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700 shadow-lg backdrop-blur-sm text-sm sm:text-base"
                                />
                                <button
                                    type="submit"
                                    className="h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-gray-800/50 text-white hover:bg-gray-700 transition-all duration-300 text-sm sm:text-base shadow-lg border border-gray-700 backdrop-blur-sm"
                                >
                                    Go
                                </button>
                            </form>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Grid;
