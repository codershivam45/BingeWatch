'use client'
import React from 'react'
import { fetchRatedMovies } from '@/utils/movie'
import HeroSection from '@/components/HeroSection'
import Grid from '@/components/Grid'
const page = () => {
  const item = {
    name: "Top Rated Movies",
    desc: "Explore the highest-rated movies of all time. Handpicked gems with critical acclaim and fan favorites.",
    image: "/hero.png"
  }

  return (
    <div className='text-white'>
      <HeroSection item={item} />
      <div className="container mx-auto w-[90vw] sm:px-6 lg:px-8 py-6 sm:py-8">
        <Grid fetchFunction={fetchRatedMovies} mediaType={"movie"} />
      </div>
    </div>
    
  )
}

export default page
