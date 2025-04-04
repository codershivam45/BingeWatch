'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const [dropdownMovie, setDropdownMovie] = useState(false)
    const [dropdownShows, setDropdownShows] = useState(false)
    const [dropdownPeople, setDropdownPeople] = useState(false)
    const [dropdownMore, setDropdownMore] = useState(false)
    const [showHam, setShowHam] = useState(false)

    const menuRef = useRef(null)

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowHam(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="bg-gray-900 shadow-md mx-auto">
            {/* Desktop Navbar */}
            <div className="hidden xl:flex p-5 text-white justify-between items-center w-[80%] mx-auto h-20">
                <div className="Link flex gap-10 items-center">
                    <Link href="/">
                        <div className="logo font-extrabold text-4xl sm:text-5xl text-teal-500 hover:text-teal-700 transition-colors duration-300 ease-in-out transform-gpu hover:scale-105 hover:translate-y-1 drop-shadow-xl">
                            BingeWatch
                        </div>
                    </Link>
                    <ul className="flex gap-6 items-center">
                        {/* Movies Dropdown */}
                        <li
                            onMouseOver={() => setDropdownMovie(true)}
                            onMouseOut={() => setDropdownMovie(false)}
                            className="relative cursor-pointer hover:text-gray-300"
                        >
                            <button>Movies</button>
                            <div className="relative">
                                {dropdownMovie && (
                                    <div className="absolute z-50 py-1 bg-gray-800 border border-slate-600 text-white rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            {['Popular', 'Now Playing', 'Upcoming', 'Top Rated'].map((item, index) => (
                                                <Link href={`/movies/${item.split(' ')[item.split(' ').length - 1].toLocaleLowerCase()}`} key={index} className="hover:bg-gray-700 px-4 py-1">
                                                    <li>{item}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>

                        {/* TV Shows Dropdown */}
                        <li
                            onMouseOver={() => setDropdownShows(true)}
                            onMouseOut={() => setDropdownShows(false)}
                            className="relative cursor-pointer hover:text-gray-300"
                        >
                            <button>TV Shows</button>
                            <div className="relative">
                                {dropdownShows && (
                                    <div className="absolute z-50 py-1 bg-gray-800 border border-slate-600 text-white rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            {['Popular', 'Airing Today', 'On TV', 'Top Rated'].map((item, index) => (
                                                <Link href={`/shows/${item.split(' ')[item.split(' ').length - 1].toLocaleLowerCase()}`} key={index} className="hover:bg-gray-700 px-4 py-1">
                                                    <li>{item}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>

                        {/* People Dropdown */}
                        <li
                            onMouseOver={() => setDropdownPeople(true)}
                            onMouseOut={() => setDropdownPeople(false)}
                            className="relative cursor-pointer hover:text-gray-300"
                        >
                            <button>People</button>
                            <div className="relative">
                                {dropdownPeople && (
                                    <div className="absolute z-50 py-1 bg-gray-800 border border-slate-600 text-white rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            <Link href="/persons/popular" className="hover:bg-gray-700 px-4 py-1">
                                                <li>Popular</li>
                                            </Link>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>

                        {/* More Dropdown */}
                        <li
                            onMouseOver={() => setDropdownMore(true)}
                            onMouseOut={() => setDropdownMore(false)}
                            className="relative cursor-pointer hover:text-gray-300"
                        >
                            <button>More</button>
                            <div className="relative">
                                {dropdownMore && (
                                    <div className="absolute z-50 py-1 bg-gray-800 border border-slate-600 text-white rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            {['Discussion', 'Leaderboard', 'Support'].map((item, index) => (
                                                <Link href="#" key={index} className="hover:bg-gray-700 px-4 py-1">
                                                    <li>{item}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Profile Icons */}
                <div>
                    <ul className="flex gap-3">
                        <li>
                            {/* <Image alt="profile" src="/profile.svg" width={20} height={20} /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M12 14c-4 0-6 2-6 6h12c0-4-2-6-6-6z" />
                            </svg>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="16.5" y1="16.5" x2="22" y2="22" />
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="flex xl:hidden p-5 text-white justify-between items-center px-5 h-20">
                {/* Hamburger Menu */}
                <div className="hamburger" onClick={() => setShowHam(!showHam)}>
                    {/* <Image src="/hamburger.png" alt="line" width={30} height={30} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>

                </div>

                {/* Logo */}
                <Link href="/">
                    <div className="logo font-extrabold text-4xl sm:text-5xl text-teal-500 hover:text-teal-700 transition-colors duration-300 ease-in-out transform-gpu hover:scale-105 hover:translate-y-1 drop-shadow-xl">
                        BingeWatch
                    </div>

                </Link>

                {/* Profile & Search */}
                <div className="profile flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M12 14c-4 0-6 2-6 6h12c0-4-2-6-6-6z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="16.5" y1="16.5" x2="22" y2="22" />
                    </svg>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {showHam && (
                <div ref={menuRef} className=" xl:hidden z-50 fixed top-[4.9rem] left-0 h-screen bg-gray-900 shadow-lg border-none p-4 w-[80%]">
                    <ul className="flex-col space-y-2 items-center">
                        {/* Movies Dropdown */}
                        <li
                            onMouseOver={() => setDropdownMovie(true)}
                            onMouseOut={() => setDropdownMovie(false)}
                            className="relative cursor-pointer text-xl text-gray-300"
                        >
                            <button>Movies</button>
                            <div className="relative">
                                {dropdownMovie && (
                                    <div className="z-50 py-1 text-lg text-gray-300 rounded-lg transition-all duration-300 ">
                                        <ul className="flex flex-col">
                                            {['Popular', 'Now Playing', 'Upcoming', 'Top Rated'].map((item, index) => (
                                                <Link href={`/movies/${item.split(' ')[item.split(' ').length - 1].toLocaleLowerCase()}`} key={index} className="px-4 py-1">
                                                    <li>{item}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>

                        {/* TV Shows Dropdown */}
                        <li
                            onMouseOver={() => setDropdownShows(true)}
                            onMouseOut={() => setDropdownShows(false)}
                            className="relative cursor-pointer text-xl text-gray-300"
                        >
                            <button>TV Shows</button>
                            <div className="relative">
                                {dropdownShows && (
                                    <div className="py-1 rounded-lg text-lg text-gray-300 transition-all duration-300">
                                        <ul className="flex flex-col">
                                            {['Popular', 'Airing Today', 'On TV', 'Top Rated'].map((item, index) => (
                                                <Link href={`/shows/${item.split(' ')[item.split(' ').length - 1].toLocaleLowerCase()}`} key={index} className="px-4 py-1">
                                                    <li>{item}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>

                        {/* People Dropdown */}
                        <li
                            onMouseOver={() => setDropdownPeople(true)}
                            onMouseOut={() => setDropdownPeople(false)}
                            className="relative cursor-pointer text-xl text-gray-300"
                        >
                            <button>People</button>
                            <div className="relative">
                                {dropdownPeople && (
                                    <div className="py-1 text-lg text-gray-300 rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            <Link href="/persons/popular" className="px-4 py-1">
                                                <li>Popular</li>
                                            </Link>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>

                        {/* More Dropdown */}
                        <li
                            onMouseOver={() => setDropdownMore(true)}
                            onMouseOut={() => setDropdownMore(false)}
                            className="relative cursor-pointer text-xl text-gray-300"
                        >
                            <button>More</button>
                            <div className="relative">
                                {dropdownMore && (
                                    <div className="py-1 text-lg text-gray-300 rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            {['Discussion', 'Leaderboard', 'Support'].map((item, index) => (
                                                <Link href="#" key={index} className="px-4 py-1">
                                                    <li>{item}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar
