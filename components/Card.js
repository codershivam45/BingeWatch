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
            setlink(`/movie/${item.id}-${(item.title).replaceAll(' ','-')}`)
        } else {
            setlink(`/tv/${item.id}-${(item.name).replaceAll(' ', '-')}`)
        }
    },[] )
    
    

    return (
        <Link href={link} className='w-[200px] h-[400px] '>
        <div className='w-[200px] h-[400px] '>
            <div className="poster w-[200px] h-[300px] rounded-full ">
                <Image alt="poster" className="rounded-xl object-cover" width={200} height={200} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}></Image>
            </div>
            <div className="text mx-2 my-1 ">
                <div className='title font-bold overflow-auto'>
                    {item.title || item.name}
                </div>
                <div className='release_date text-sm text-gray-600'>
                    {formatDate(item.release_date || item.first_air_date)}
                </div>
            </div>
        </div>
        </Link>
    )
}

export default Card
