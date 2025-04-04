import React, { useEffect, useState } from 'react';
import Card from './Card';
import { fetchFreeMoviesOrTV } from '@/utils/freeToWatch';
import Loading from './Loading';

const FreeToWatch = () => {
    const [isMovie, setisMovie] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (media_type) => {
        setLoading(true);
        setError(null); // Reset error state before fetching

        try {
            const response = await fetchFreeMoviesOrTV({ media_type });
            console.log(response); // Debugging: Log the response
            setData(response);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch initial data (default to movies)
    useEffect(() => {
        fetchData("movie");
    }, []);

    return (
        <section className="bg-black text-white">
            <div className="title text-sm md:text-md w-[90vw] md:w-[80vw] mx-auto flex md:items-center gap-3 md:gap-10 md:mt-8 md:flex-row flex-col">
                <p className="mx-2 font-semibold text-white text-2xl">Free To Watch</p>
                <div className="flex gap-4  w-fit">
                    <div
                        className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300 ${isMovie ? "bg-red-600 text-white scale-105" : "bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white"} 
        text-sm md:text-xs`}
                        onClick={() => { if (!isMovie) { fetchData("movie"); setisMovie(true); } }}>
                        Movies
                    </div>
                    <div
                        className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300 
        ${!isMovie ? "bg-red-600 text-white scale-105" : "bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white"} 
        text-sm md:text-xs`}
                        onClick={() => { if (isMovie) { fetchData("tv"); setisMovie(false); } }}>
                        TV
                    </div>
                </div>
            </div>

            <div className="flex w-[90vw] md:w-[80vw] mx-auto overflow-x-auto overflow-y-hidden m-4 gap-5">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : data && data.length > 0 ? (
                    data.map((item, index) => <Card key={index} item={item} />)
                ) : (
                    <div className="text-white">No {isMovie ? 'movies' : 'shows'} available</div>
                )}
            </div>
        </section>
    );
};

export default FreeToWatch;
