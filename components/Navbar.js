'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const pathname = usePathname()

    // Menu items data
    const menuItems = {
        Movies: ['Popular', 'Now Playing', 'Upcoming', 'Top Rated'],
        'Shows': ['Popular', 'Airing Today', 'On TV', 'Top Rated'],
        Persons: ['Popular'],
        More: ['Discussion', 'Leaderboard', 'Support']
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveDropdown(null)
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Toggle dropdown
    const toggleDropdown = (item) => {
        setActiveDropdown(activeDropdown === item ? null : item)
    }

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    // Generate link path
    const getLinkPath = (category, item) => {
        const basePath = category.toLowerCase().replace(' ', '')
        const itemPath = item.toLowerCase().split(' ')[item.toLowerCase().split(' ').length-1]
        return `/${basePath}/${itemPath}`
    }

    // Check if current page is home
    const isHomePage = pathname === '/'

    return (
        <nav className={`w-full bg-gray-900 shadow-lg z-[9999] ${!isHomePage ? 'sticky top-0' : ''}`}>
            {/* Desktop Navbar */}
            <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
                {/* Logo */}
                <div className='flex items-center space-x-8'>
                    <Link href="/" className="flex-shrink-0">
                        <span className="text-4xl font-bold text-white hover:text-teal-400 transition-colors">
                            BingeWatch
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="flex items-center space-x-8">
                        {Object.keys(menuItems).map((item) => (
                            <div key={item} className="relative group" onClick={()=>{toggleDropdown(item)}} >
                                <button
                                    className="text-white hover:text-teal-400 transition-colors"
                                    >
                                       {item}
                                </button>
                                {activeDropdown === item && (
                                    <div className="absolute   top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-[9999]">
                                        <ul className="py-2">
                                            {menuItems[item].map((subItem) => (
                                                <li key={subItem}>
                                                    <Link
                                                        href={getLinkPath(item, subItem)}
                                                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                    >
                                                        {subItem}
                                                </Link>
                        </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                            </div>
                </div>


                {/* Desktop Icons */}
                <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-teal-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="16.5" y1="16.5" x2="22" y2="22" />
                            </svg>
                    </button>
                    <button className="text-white hover:text-teal-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M12 14c-4 0-6 2-6 6h12c0-4-2-6-6-6z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3">
                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="text-white hover:text-teal-400 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                </button>

                {/* Mobile Logo */}
                <Link href="/" className="flex-shrink-0">
                    <span className="text-2xl font-bold text-white  hover:text-teal-400 transition-colors">
                        BingeWatch
                    </span>
                </Link>

                {/* Mobile Icons */}
                <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-teal-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="16.5" y1="16.5" x2="22" y2="22" />
                    </svg>
                    </button>
                    <button className="text-white hover:text-teal-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M12 14c-4 0-6 2-6 6h12c0-4-2-6-6-6z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div ref={menuRef} className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999]">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
                            <span className="text-xl font-bold text-white ">Menu</span>
                            <button
                                onClick={toggleMobileMenu}
                                className="text-white hover:text-teal-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                                    </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {Object.keys(menuItems).map((item) => (
                                <div key={item} className="mb-4">
                                    <button
                                        onClick={() => toggleDropdown(item)}
                                        className="w-full text-left text-lg text-white hover:text-teal-400 transition-colors py-2"
                                    >
                                        {item}
                                    </button>
                                    {activeDropdown === item && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            {menuItems[item].map((subItem) => (
                                                <Link
                                                    key={subItem}
                                                    href={getLinkPath(item, subItem)}
                                                    className="block text-gray-300 hover:text-white transition-colors py-1"
                                                >
                                                    {subItem}
                                                </Link>
                                            ))}
                                    </div>
                                )}
                            </div>
                            ))}
                                    </div>
                            </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
