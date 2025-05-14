'use client'
import React from 'react'
import { fetchPopularMovies } from '@/utils/popular'
import HeroSection from '@/components/HeroSection'
import Grid from '@/components/Grid'

const Page = () => {

  const item = {
    name: 'Popular Movies',
    desc: 'Discover the most popular movies right now. Browse through our curated collection of trending films.',
    image: '/hero.png',
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <HeroSection item={item} />
      <div className="container mx-auto w-[90vw] sm:px-6 lg:px-8 py-6 sm:py-8">
        <Grid fetchFunction={fetchPopularMovies} mediaType={"movie"} />
      </div>
    </main>
  )
}

export default Page
