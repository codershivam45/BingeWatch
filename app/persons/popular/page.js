'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchPersonDetails, fetchPersonsByName, fetchPopularPersons } from '@/utils/person';
import Link from 'next/link';
import Loading from '@/components/Loading';
import PersonCard from '@/components/PersonCard';

const Page = () => {
  const [actors, setActors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [pageInput, setPageInput] = useState('')

  const getPopularPerson = async (page) => {
    setLoading(true);
    const res = await fetchPopularPersons(page);

    setActors(res.data);
    setTotalPages(res.total_pages);
    setSearchQuery('');
    setLoading(false);
  };

  const getPersonByName = async (name, page) => {
    setLoading(true);
    const res = await fetchPersonsByName(name, page);

    setActors(res.data);
    setTotalPages(res.total_pages);
    // setSearchQuery(name);
    setLoading(false);
  }

  useEffect(() => {
    if(searchQuery===''){
      getPopularPerson(page);
    }else{
      getPersonByName(searchQuery, page);
    }
   
  },[page,searchQuery]);


 
  // const handleSearch = async (e) => {
  //   // e.preventDefault()
  //   const query = searchQuery.toLowerCase();
  //   if (query === '') {
  //     getPopularPerson(1);
  //   } else {
  //     getPersonByName(query, 1);
  //   }
  //   setSearchQuery(query);
  // };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const onInputChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setPageInput(value)
    }
  }

  const onInputSubmit = (e) => {
    e.preventDefault()
    const pageNum = parseInt(pageInput)
    if (pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum)
      setPageInput('') // Reset page input after submission
    }
  }
  const renderPagination = () => {
    const pages = []
    let startPage = Math.max(1, page - 1)
    let endPage = Math.min(totalPages, page + 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-gray-700 backdrop-blur-sm text-sm sm:text-base ${i === page
            ? 'bg-red-600 text-white scale-110 shadow-xl border-red-500'
            : 'bg-gray-800/50 text-white hover:bg-gray-700'
            }`}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Popular Actors</h1>

        {/* Search Filter */}
        <div className="mb-6 flex bg-gray-800 items-center rounded-lg  hover:ring-2 " >
          <svg className="h-5 w-5 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search actors..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value) }}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Actors Grid */}
        {
          loading ?
            <Loading />
            :
            <>
              <div className="w-[90vw] place-items-center sm:w-[80vw] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {actors.length===0 && 
                  <div className='flex justify-center'>No Records to Show</div>
                }
                {actors.map((actor) => (
                  <Link
                    key={actor.id}
                    href={actor.id ? `/person/${actor.id}-${encodeURIComponent(actor.name)}` : '#'}
                    passHref
                  >
                    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden w-[150px] h-[250px] md:w-[200px] md:h-[340px] mx-auto">
                      <div className="w-full h-[200px] md:h-[300px] relative">
                        <Image
                          src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/no-avatar.png'}
                          alt={actor.name}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                      <h2 className="mt-2 text-center text-lg font-semibold px-2 truncate">{actor.name}</h2>
                    </div>

                    
                  </Link>
                  
                ))}
              </div>

              {/* Pagination Section */}
              <div className="flex flex-col items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg border border-gray-700 backdrop-blur-sm"
                  >
                    ←
                  </button>
                  <div className="flex items-center gap-1 sm:gap-2">{renderPagination()}</div>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg border border-gray-700 backdrop-blur-sm"
                  >
                    →
                  </button>
                </div>

                {/* Page input */}
                <form onSubmit={onInputSubmit} className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={pageInput}
                    onChange={onInputChange}
                    placeholder="Go to page"
                    className="w-24 sm:w-28 h-10 sm:h-12 px-3 sm:px-4 rounded-xl bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700 shadow-lg backdrop-blur-sm text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    className="h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-gray-800/50 text-white hover:bg-gray-700 transition-all duration-300 text-sm sm:text-base shadow-lg border border-gray-700 backdrop-blur-sm"
                  >
                    Go
                  </button>
                </form>
              </div>
            </>
        }
      </div>
    </div>
  );
};

export default Page;
