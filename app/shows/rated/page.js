'use client'
import React from 'react'
import { fetchRatedShows } from '@/utils/show'
import HeroSection from '@/components/HeroSection'
import Grid from '@/components/Grid'

const page = () => {
  const item = {
    name: "Top Rated TV Shows",
    desc: "Check out the best TV shows ever made. Critically acclaimed and loved by fans across the world.",
    image: "/hero.png"
  }

  return (
    <div className='text-white'>
      <HeroSection item={item} />
      <div className="container mx-auto w-[90vw] sm:px-6 lg:px-8 py-6 sm:py-8">
        <Grid fetchFunction={fetchRatedShows} />
      </div>
    </div>
  )
}

export default page
