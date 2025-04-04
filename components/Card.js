import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
const Card = ({ item }) => {
    // console.log({ item })
    const [link, setlink] = useState('')
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleString('en-US', options).toUpperCase();
    }
    useEffect(() => {
        if (item?.release_date) {
            setlink(`/movie/${item.id}-${(item.title)?.replaceAll(' ', '-')}`)
        } else {
            setlink(`/tv/${item.id}-${(item.name)?.replaceAll(' ', '-')}`)
        }
    }, [])



    return (
        <Link href={link} className='w-[200px] h-[400px] transform transition duration-300 hover:scale-105 hover:z-10 '>
            <div className='w-[200px] h-[400px] relative'>
                <div className="poster w-[200px] h-[300px] rounded-full relative">
                    <Image alt="poster" className="rounded-xl object-cover" width={200} height={200} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}></Image>
                    <div className='absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-500 text-white flex items-center justify-center rounded-full text-sm font-bold shadow-lg border-2 border-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                        {item.vote_average.toFixed(1)}
                    </div>
                </div>
                <div className="text mx-2 my-1 ">
                    <div className='title font-bold overflow-auto text-white'>
                        {item.title || item.name}
                    </div>
                    <div className='release_date text-sm text-gray-400'>
                        {formatDate(item.release_date || item.first_air_date)}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card
