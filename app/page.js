"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "@/utils/trending";
import Popular from "@/components/Popular";
import FreeToWatch from "@/components/FreeToWatch";
import Loading from "@/components/Loading";
import {useRouter} from "next/navigation";

export default function Home() {
  const router=useRouter();
  const [trendingmovie, setTrendingMovie] = useState([]);
  const [isWeek, setIsWeek] = useState(false);
  const [isTVWeek, setIsTVWeek] = useState(false);
  const [trendingtv, setTrendingTV] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  

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
      console.log("Error fetching data:", err);
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
    <main className="bg-black text-white">
      {/* Search Bar */}
      {/* <div className="searchBar w-full flex p-4 bg-gray-800 border border-gray-800 sm:justify-center sticky top-0 z-30">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} onKeyDown={(e) => { if (e.key == "Enter") { router.push(`/search?q=${search}`) } }}  placeholder="Search for your favorite movies, shows, or actors" className="text-lg focus:outline-none w-[90%] bg-transparent text-white placeholder-gray-400" />
      </div> */}

      {/* Welcome Section */}
      <section className="welcome w-[100vw] h-[50vh] text-white bg-top  bg-[url('/hero.png')] flex flex-col justify-between py-12 sm:py-16">
        <div className="w-[90vw] lg:w-[80vw] ml-[5vw] lg:ml-[10vw] flex flex-col gap-1 text-lime-100 ">
          <div className="text-5xl font-bold">Welcome</div>
          <div className="text-xl font-semibold">to the world of movies and shows.</div>
          <div className="text-xl font-semibold">Here you can search for your favorite movies, shows.</div>
        </div>
        <div className="w-[90vw] lg:w-[80vw] rounded-full ml-[5vw] lg:ml-[10vw] bg-gray-800 flex justify-between">
          <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} onKeyDown={(e)=>{if(e.key=="Enter"){ router.push(`/search?q=${query}`)}}} placeholder="Search for your favorite movies, shows, or actors" className="p-4 rounded-full w-[70vw] bg-gray-800 text-white focus:outline-none" />
          <button className="px-8 rounded-full bg-red-700 " onClick={() => {console.log("clicked"); router.push(`/search?q=${query}`) }}>Search</button>
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="m-2 mt-8">
        <div className="title w-[90vw] text-sm md:text-md md:w-[80vw] mx-auto flex md:items-center gap-3 md:gap-10 md:flex-row flex-col">
          <p className="mx-2 font-semibold text-white text-2xl">Trending Movies</p>
          <div className="flex gap-4  w-fit ">
            <div
              className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300 
        ${!isWeek ? "bg-red-600 text-white scale-105" : "bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white"} 
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
        ${isWeek ? "bg-red-600 text-white scale-105" : "bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white"} 
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
        <div className="flex w-[90vw]  md:w-[80vw] mx-auto overflow-x-auto m-4 gap-5 overflow-y-hidden">
          {loading ? (
            <Loading />
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
          <p className="mx-2 font-semibold text-white text-2xl">Trending Shows</p>
          <div className="flex gap-4 w-fit">
            <div
              className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300 
        ${!isTVWeek ? "bg-red-600 text-white scale-105" : "bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white"} 
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
        ${isTVWeek ? "bg-red-600 text-white scale-105" : "bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white"} 
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
        <div className="flex w-[90vw] md:w-[80vw] mx-auto overflow-x-auto overflow-y-hidden m-4 gap-5">
          {loading ? (
            <Loading />
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
