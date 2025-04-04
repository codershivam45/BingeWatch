'use client'
import React from 'react'
import HeroSection from '@/components/HeroSection'
import { fetchTVShows } from '@/utils/show'
import Grid from '@/components/Grid'

const page = () => {
  const item = {
    name: "TV Shows",
    desc: "Dive into a wide range of TV shows across genres. From drama to comedy, there's something for everyone.",
    image: "/tv-shows.png"
  }

  return (
    <div className='text-white'>
      <HeroSection item={item} />
      <div className="container mx-auto w-[90vw] sm:px-6 lg:px-8 py-6 sm:py-8">
        <Grid fetchFunction={fetchTVShows} />
      </div>
    </div>
  )
}

export default page
