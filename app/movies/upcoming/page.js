'use client'
import React from 'react'
import { fetchUpcomingMovies } from '@/utils/movie'
import HeroSection from '@/components/HeroSection'
import Grid from '@/components/Grid'

const page = () => {
  const item = {
    name: "Upcoming Movies",
    desc: "Get a sneak peek at upcoming movie releases. Mark your calendars for the most anticipated films.",
    image: "/hero.png"
  }

  return (
    <div className='text-white'>
      <HeroSection item={item} />
      <div className="container mx-auto w-[90vw] sm:px-6 lg:px-8 py-6 sm:py-8">
        <Grid fetchFunction={fetchUpcomingMovies} />
      </div>
    </div>
  )
}

export default page
