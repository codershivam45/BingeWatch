import React, { useState, useEffect } from "react";
import Card from "./Card";
import { fetchStreamingMovies, fetchForRentMovies, fetchOnTVMovies, fetchInTheatersMovies } from "@/utils/popular";
import Loading from "./Loading";

const Popular = () => {
    const [isStreaming, setisStreaming] = useState(true);
    const [isOnTv, setisOnTv] = useState(false);
    const [forRent, setforRent] = useState(false);
    const [theaters, setTheaters] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const options = [
        { name: "Streaming", state: isStreaming, setter: setisStreaming, fetchFunction: fetchStreamingMovies },
        { name: "TV", state: isOnTv, setter: setisOnTv, fetchFunction: fetchOnTVMovies },
        { name: "Rent", state: forRent, setter: setforRent, fetchFunction: fetchForRentMovies },
        { name: "Theaters", state: theaters, setter: setTheaters, fetchFunction: fetchInTheatersMovies },
    ];

    const handleClick = async (setter, fetchFunction) => {
        // Reset all states
        setisStreaming(false);
        setisOnTv(false);
        setforRent(false);
        setTheaters(false);

        setter(true); // Set the selected tab to active
        setLoading(true); // Start loading

        try {
            if (setter == setTheaters) {
                const response = await fetchFunction({});
                setData(response.results || []); // Set the fetched data
            } else {
                const response = await fetchFunction({});
                setData(response.results || []); // Set the fetched data
            }


        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]); // Reset data on error
        }

        setLoading(false); // Stop loading
    };

    // Fetch default data on mount (Streaming)
    useEffect(() => {
        handleClick(setisStreaming, fetchStreamingMovies);
    }, []);

    return (
        <section>
            {/* Heading and Filter Tabs */}
            <div className="flex w-[90vw] text-sm md:text-md md:w-[80vw] mx-auto flex-col md:flex-row  m-4 gap-2">
                <p className="mx-2 font-semibold text-black text-2xl">What&apos;s Popular</p>
                <div className="flex gap-4 overflow-none mt-3 md:mt-0">
                    {options.map(({ name, state, setter, fetchFunction }) => (
                        <div
                            key={name}
                            className={`py-2 px-4 rounded-full cursor-pointer flex items-center transition-all duration-300  ${state ? "bg-red-600 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"}text-sm md:text-xs`}
                            onClick={() => {
                                if (!state) {
                                    handleClick(setter, fetchFunction);
                                }
                            }}
                        >
                            {name}
                        </div>

                    ))}
                </div>

            </div>

            {/* Display Movies */}
            <div className="flex w-[90vw] md:w-[80vw] mx-auto overflow-x-auto overflow-y-hidden m-4 gap-2">
                {loading ? (
                    <Loading/>
                ) : data.length > 0 ? (
                    data.map((item, index) => <Card key={index} item={item} />)
                ) : (
                    <div>No Data Found</div>
                )}
            </div>
        </section>
    );
};

export default Popular;
