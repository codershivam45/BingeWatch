'use client'
import React from 'react'
import HeroSection from '@/components/HeroSection'
import Grid from '@/components/Grid'
import { fetchPlayingMovies } from '@/utils/movie'
const page = () => {

  const item = {
    name: "Playing Movies",
    desc: "Catch the latest movies currently playing in theaters. Stay up-to-date with what's hot on the big screen.",
    image: "/hero.png"
  }
  return (
    <div className='text-white'>

      <HeroSection item={item} />
      <div className="container mx-auto w-[90vw] sm:px-6 lg:px-8 py-6 sm:py-8">
        <Grid fetchFunction={fetchPlayingMovies} />
      </div>
    </div>
  )
}

export default page
