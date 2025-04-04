'use client'
import React from 'react'
import HeroSection from '@/components/HeroSection'
import { fetchPopularShows } from '@/utils/show'
import Grid from '@/components/Grid'

const page = () => {
  const item = {
    name: "Popular TV Shows",
    desc: "Binge the most talked-about TV shows. Find out what everyone’s watching and talking about.",
    image: "/hero.png"
  }

  return (
    <div className='text-white'>
      <HeroSection item={item} />
      <div className="container mx-auto w-[90vw] sm:px-6 lg:px-8 py-6 sm:py-8">
        <Grid fetchFunction={fetchPopularShows} />
      </div>
    </div>
  )
}

export default page
