"use client";
import Image from "next/image";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "@/utils/trending";
import Popular from "@/components/Popular";
import FreeToWatch from "@/components/FreeToWatch";

export default function Home() {
  const [trendingmovie, setTrendingMovie] = useState([]);
  const [isWeek, setIsWeek] = useState(false);
  const [isTVWeek, setIsTVWeek] = useState(false);
  const [trendingtv, setTrendingTV] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieORTv = async (media_type, time_window) => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const data = await fetchTrendingMovies({ media_type, time_window });

      if (media_type === "movie") {
        setTrendingMovie(data.results);
      } else {
        setTrendingTV(data.results);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial trending movies and TV shows
  useEffect(() => {
    fetchMovieORTv("movie", "day");
    fetchMovieORTv("tv", "day");
  }, []);

  return (
    <main>
      {/* Search Bar */}
      <div className="searchBar w-full flex p-4 bg-white border border-bg-gray-300 sm:justify-center sticky top-0">
        <Image alt="search" src="/search.png" width={24} height={24} />
        <input type="text" placeholder=" Search for your favorite movies, shows, or actors " className="text-lg focus:outline-none w-[90%]" />
      </div>

      {/* Welcome Section */}
      <section className="welcome w-[100vw] h-[50vh] text-white bg-cover bg-center bg-[url('/welcome.jpg')] flex flex-col justify-between py-12 sm:py-16">
        <div className="w-[90vw] lg:w-[80vw] ml-[5vw] lg:ml-[10vw] flex flex-col gap-1">
          <div className="text-5xl font-bold">Welcome</div>
          <div className="text-xl font-semibold">to the world of movies and shows.</div>
          <div className="text-xl font-semibold">Here you can search for your favorite movies, shows.</div>
        </div>
        <div className="w-[90vw] lg:w-[80vw] rounded-full ml-[5vw] lg:ml-[10vw] bg-white flex justify-between">
          <input type="text" placeholder="Search for your favorite movies, shows, or actors" className="p-4 rounded-full w-[70vw] text-black focus:outline-none" />
          <button className="px-8 rounded-full bg-red-700 border border-white">Search</button>
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="m-2 mt-8">
        <div className="title w-[90vw] text-sm md:text-md md:w-[80vw] mx-auto flex md:items-center gap-3 md:gap-10 md:flex-row flex-col">
          <p className="mx-2 font-semibold text-black text-2xl">Trending Movies</p>
          <div className="flex gap-4  w-fit">
            <div
              className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300 
        ${!isTVWeek ? "bg-red-600 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"} 
        text-sm md:text-xs`}
              onClick={() => {
                if (isWeek) {
                  fetchMovieORTv("movie", "day");
                }
                setIsWeek(false);
              }}
            >
              Today
            </div>
            <div
              className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300 
        ${isWeek ? "bg-red-600 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"} 
        text-sm md:text-xs`}
              onClick={() => {
                if (!isWeek) {
                  fetchMovieORTv("movie", "week");
                }
                setIsWeek(true);
              }}
            >
              This Week
            </div>
          </div>
        </div>
        <div className="flex w-[90vw]  md:w-[80vw] mx-auto overflow-x-auto m-4 gap-2">
          {loading ? (
            <div>Loading movies...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : trendingmovie.length > 0 ? (
            trendingmovie.map((item, index) => <Card key={index} item={item} />)
          ) : (
            <div>No trending movies available</div>
          )}
        </div>
      </section>

      {/* Trending TV Shows Section */}
      <section>
        <div className="title w-[90vw]  text-sm md:text-md md:w-[80vw] mx-auto flex md:items-center gap-3 md:gap-10 md:mt-8 md:flex-row flex-col">
          <p className="mx-2 font-semibold text-black text-2xl">Trending Shows</p>
          <div className="flex gap-4 w-fit">
            <div
              className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300 
        ${!isTVWeek ? "bg-red-600 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"} 
        text-sm md:text-xs`}
              onClick={() => {
                if (isTVWeek) {
                  fetchMovieORTv("tv", "day");
                }
                setIsTVWeek(false);
              }}
            >
              Today
            </div>
            <div
              className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300 
        ${isTVWeek ? "bg-red-600 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"} 
        text-sm md:text-xs`}
              onClick={() => {
                if (!isTVWeek) {
                  fetchMovieORTv("tv", "week");
                }
                setIsTVWeek(true);
              }}
            >
              This Week
            </div>
          </div>
        </div>
        <div className="flex w-[90vw] md:w-[80vw] mx-auto overflow-x-auto m-4 gap-2">
          {loading ? (
            <div>Loading shows...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : trendingtv.length > 0 ? (
            trendingtv.map((item, index) => <Card key={index} item={item} />)
          ) : (
            <div>No trending shows available</div>
          )}
        </div>
      </section>
      {/* Other Sections */}
      <Popular />
      <FreeToWatch />
    </main>
  );
}
