
'use server'

// Fetch Streaming Movies
export async function fetchStreamingMovies() {
    const page = Math.floor(Math.random() * 50) + 1; // Generates a random number between 1 and 50

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.API_KEY}&language=en-US&page=${page}&with_watch_monetization_types=flatrate`);
    const data = await res.json();
    return data;
}

// Fetch Movies On TV
export async function fetchOnTVMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover/tv?api_key=${process.env.API_KEY}`);
    const data = await res.json();
    return data;
}

// Fetch Movies Available for Rent
export async function fetchForRentMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.API_KEY}&with_watch_monetization_types=rent`);
    const data = await res.json();
    return data;
}

// Fetch Movies in Theaters
export async function fetchInTheatersMovies() {
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split("T")[0];

    // Get the date one month before
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);
    const oneMonthAgo = pastDate.toISOString().split("T")[0];

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.API_KEY}&primary_release_date.gte=${oneMonthAgo}&primary_release_date.lte=${currentDate}&with_release_type=2|3`
    );

    const data = await res.json();
    return data;
}

