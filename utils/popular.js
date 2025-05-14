'use server'

// Fetch Streaming Movies
export async function fetchStreamingMovies() {
    // const page = Math.floor(Math.random() * 50) + 1; // Generates a random number between 1 and 50

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.API_KEY}&language=en-US&with_watch_monetization_types=flatrate`);
        if (!res.ok) {
            throw new Error(`Failed to fetch streaming movies. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching streaming movies:", error.message);
        return [];
    }
}

// Fetch Movies On TV
export async function fetchOnTVMovies() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover/tv?api_key=${process.env.API_KEY}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch movies on TV. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching movies on TV:", error.message);
        return [];
    }
}

// Fetch Movies Available for Rent
export async function fetchForRentMovies() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.API_KEY}&with_watch_monetization_types=rent`);
        if (!res.ok) {
            throw new Error(`Failed to fetch movies for rent. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching movies for rent:", error.message);
        return [];
    }
}

// Fetch Movies in Theaters
export async function fetchInTheatersMovies() {
    try {
        // Get the current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split("T")[0];

        // Get the date one month before
        const pastDate = new Date();
        pastDate.setMonth(pastDate.getMonth() - 1);
        const oneMonthAgo = pastDate.toISOString().split("T")[0];

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.API_KEY}&primary_release_date.gte=${oneMonthAgo}&primary_release_date.lte=${currentDate}&with_release_type=2|3`
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch movies in theaters. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching movies in theaters:", error.message);
        return [];
    }
}

// Fetch Popular Movies
export async function fetchPopularMovies(page) {
    // console.log("Function called with:", page); // Step 1: Log input
    // console.log("Type of page:", typeof page); // Step 2: Log type

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/popular?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await res.json();
        // console.log("API Response:", data); // Step 3: Log response
        
        return { data: data.results, total_pages: Math.min(500,data.total_pages) };
    } catch (error) {
        console.log("Error fetching popular movies:", error.message);
        return [];
    }
}


