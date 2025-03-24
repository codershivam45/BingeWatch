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
        <div className="bg-gradient-to-r from-[#8e44ad] to-[#3498db] shadow-md mx-auto">
            {/* Desktop Navbar */}
            <div className="hidden md:flex p-5 text-white justify-between items-center w-[80%] mx-auto h-20">
                <div className="Link flex gap-10 items-center">
                    <Link href="/">
                        <div className="logo font-bold text-3xl hover:scale-105 transition-transform ease-in-out duration-300">BingeWatch</div>
                    </Link>
                    <ul className="flex gap-6 items-center">
                        {/* Movies Dropdown */}
                        <li
                            onMouseOver={() => setDropdownMovie(true)}
                            onMouseOut={() => setDropdownMovie(false)}
                            className="relative cursor-pointer hover:text-gray-300"
                        >
                            <button>Movies</button>
                            <div className="relative"> {/* Ensure the parent container has position relative */}
                                {dropdownMovie && (
                                    <div className="absolute z-50 py-1 bg-white border border-slate-300 text-black rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            {['Popular', 'Now Playing', 'Upcoming', 'Top Rated'].map((item, index) => (
                                                <Link href="#" key={index} className="hover:bg-slate-300 px-4 py-1">
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
                            <div className="relative"> {/* Ensure this parent container has relative positioning */}
                                {dropdownShows && (
                                    <div className="absolute z-50 py-1 bg-[#f6f4f4] border border-slate-300 shadow-xl rounded-lg text-black transition-all duration-300">
                                        <ul className="flex flex-col">
                                            {['Popular', 'Airing Today', 'On TV', 'Top Rated'].map((item, index) => (
                                                <Link href="#" key={index} className="hover:bg-slate-300 px-4 py-1">
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
                            <div className="relative"> {/* Make sure this is the parent container with position relative */}
                                {dropdownPeople && (
                                    <div className="absolute z-50 py-1 bg-white border border-slate-300 text-black rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            <Link href="#" className="hover:bg-slate-300 px-4 py-1">
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
                            <div className="relative"> {/* Make sure this is the parent container with position relative */}
                                {dropdownMore && (
                                    <div className="absolute z-50 py-1 bg-white border border-slate-300 text-black rounded-lg transition-all duration-300">
                                        <ul className="flex flex-col">
                                            {['Discussion', 'Leaderboard', 'Support'].map((item, index) => (
                                                <Link href="#" key={index} className="hover:bg-slate-300 px-4 py-1">
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
                            <Image alt="profile" src="/profile.svg" width={20} height={20} />
                        </li>
                        <li>
                            <Image alt="search" src="/search.png" width={24} height={24} />
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="flex md:hidden p-5 text-white justify-between items-center px-5 h-20">
                {/* Hamburger Menu */}
                <div className="hamburger" onClick={() => setShowHam(!showHam)}>
                    <Image src="/hamburger.png" alt="line" width={30} height={30} />
                </div>

                {/* Logo */}
                <Link href="/">
                    <div className="logo font-bold text-2xl sm:text-3xl hover:scale-105 transition-transform ease-in-out duration-300">
                        BingeWatch
                    </div>
                </Link> 

                {/* Profile & Search */}
                <div className="profile flex gap-3">
                    <Image alt="profile" src="/profile.svg" width={20} height={20} />
                    <Image alt="search" src="/search.svg" width={24} height={24} />
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {showHam && (
                <div ref={menuRef} className="z-10 fixed top-[4.9rem] left-0 h-screen bg-gradient-to-r from-[#8e44ad] to-[#3498db] shadow-lg border-none p-4 w-[80%]">
                    <ul className="flex flex-col gap-4">
                        {['Movies', 'TV Shows', 'People', 'More', 'Discussion', 'Leaderboard'].map((item, index) => (
                            <li key={index} className="cursor-pointer hover:text-gray-300 text-[#f5f5f5] text-xl">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar
