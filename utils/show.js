'use server'

// Function to fetch popular TV shows
export async function fetchPopularShows(page) {
    

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/popular?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await res.json();
        // console.log("API Response:", data);

        return { data: data.results, total_pages: Math.min(500, data.total_pages) };
    } catch (error) {
        console.log("Error fetching popular TV shows:", error.message);
        return [];
    }
}

// Function to fetch top-rated TV shows
export async function fetchRatedShows(page) {
    

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/top_rated?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await res.json();
        // console.log("API Response:", data);

        return { data: data.results, total_pages: Math.min(500, data.total_pages) };
    } catch (error) {
        console.log("Error fetching top-rated TV shows:", error.message);
        return [];
    }
}

// Function to fetch TV shows airing today
export async function fetchTodayShows(page) {
    

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/airing_today?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await res.json();
        // console.log("API Response:", data);

        return { data: data.results, total_pages: Math.min(500, data.total_pages) };
    } catch (error) {
        console.log("Error fetching TV shows airing today:", error.message);
        return [];
    }
}


export async function fetchTVShows(page) {
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/on_the_air?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await res.json();
    
        // console.log("API Response:", data); // Step 3: Log response

        return { data: data.results, total_pages: Math.min(500, data.total_pages) };
    } catch (error) {
        console.log("Error fetching TV shows:", error.message);
        return [];
    }
}

export async function fetchTVShowsByName(query, page) {
    console.log("tv so")
    console.log(query,page)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/tv?api_key=${process.env.API_KEY}&query=${query}&page=${page}`);
        const data = await res.json();
        console.log(data)
        return { data: data.results, total_pages: Math.min(500, data.total_pages) };
    } catch (error) {
        console.log("Error fetching TV shows by name:", error.message);
        return [];
    }
}
