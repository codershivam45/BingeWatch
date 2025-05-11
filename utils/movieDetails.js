'use server'

export async function fetchMovieDetails(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}?api_key=${process.env.API_KEY}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch movie details. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching movie details:", error.message);
        return null; // Return null or handle gracefully
    }
}

export async function fetchCast(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/credits?api_key=${process.env.API_KEY}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch cast details. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching cast details:", error.message);
        return null; // Return null or handle gracefully
    }
}

export async function fetchMovieVideos(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/videos?api_key=${process.env.API_KEY}`);

        if (!res.ok) throw new Error(`Failed to fetch movie videos. Status: ${res.status}`);

        const data = await res.json();
        return data.results; // returns an array of videos
    } catch (error) {
        console.log("Error fetching movie videos:", error.message);
        return [];
    }
}


export async function fetchSimilarMovies(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/similar?api_key=${process.env.API_KEY}`);

        if (!res.ok) throw new Error(`Failed to fetch similar movies. Status: ${res.status}`);

        const data = await res.json();
        return data.results; // array of similar movies
    } catch (error) {
        console.log("Error fetching similar movies:", error.message);
        return [];
    }
}


export async function fetchRecommendations(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/recommendations?api_key=${process.env.API_KEY}`);

        if (!res.ok) throw new Error(`Failed to fetch recommendations. Status: ${res.status}`);

        const data = await res.json();
        return data.results; // array of recommended movies
    } catch (error) {
        console.log("Error fetching recommendations:", error.message);
        return [];
    }
}


export async function fetchMovieReviews(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/reviews?api_key=${process.env.API_KEY}`);

        if (!res.ok) throw new Error(`Failed to fetch reviews. Status: ${res.status}`);

        const data = await res.json();
        return data.results; // array of reviews
    } catch (error) {
        console.log("Error fetching movie reviews:", error.message);
        return [];
    }
}

