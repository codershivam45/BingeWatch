'use server'
// Function to fetch top-rated movies
export async function fetchRatedMovies(page) {
    

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/top_rated?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await res.json();
        // console.log("API Response:", data);

        return { data: data.results, total_pages: Math.min(500, data.total_pages) };
    } catch (error) {
        console.log("Error fetching top-rated movies:", error.message);
        return [];
    }
}


export async function fetchUpcomingMovies(page) {
    

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    try {
        // Fetch upcoming movies from today onwards
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/upcoming?api_key=${process.env.API_KEY}&page=${page}&primary_release_date.gte=${today}`);
        const data = await res.json();
        // console.log("API Response:", data);

        return { data: data.results, total_pages: Math.min(500, data.total_pages) };
    } catch (error) {
        console.log("Error fetching upcoming movies:", error.message);
        return [];
    }
}


// Function to fetch currently playing movies
export async function fetchPlayingMovies(page) {
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/now_playing?api_key=${process.env.API_KEY}&page=${page}`);
        const data = await res.json();
        // console.log("API Response:", data);
        // console.log(data.results);
        return { data: data.results, total_pages: Math.min(500, data.total_pages) };
    } catch (error) {
        console.log("Error fetching currently playing movies:", error.message);
        return [];
    }
}

export async function fetchMoviesByName(query,page){

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/movie?api_key=${process.env.API_KEY}&query=${query}&page=${page}`)
        const data= await res.json()

        return { data: data.results , total_pages : Math.min(500,data.total_pages)}
    }catch(error){
        console.log("Error fetching movies by name:", error.message);
        return [];
    }
}
