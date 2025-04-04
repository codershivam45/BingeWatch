'use client'
import React from 'react'
import HeroSection from '@/components/HeroSection'
import { fetchTodayShows } from '@/utils/show'
import Grid from '@/components/Grid'

const page = () => {
  const item = {
    name: "Today's Shows",
    desc: "See what’s airing today. Keep track of fresh episodes and daily showtime updates.",
    image: "/today-shows.png"
  }

  return (
    <div className='text-white'>
      <HeroSection item={item} />
      <div className="container mx-auto w-[90vw] sm:px-6 lg:px-8 py-6 sm:py-8">
        <Grid fetchFunction={fetchTodayShows} />
      </div>
    </div>
  )
}

export default page
