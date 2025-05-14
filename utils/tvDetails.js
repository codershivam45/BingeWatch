'use server'

export async function fetchTvDetails(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/${id}?api_key=${process.env.API_KEY}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch TV details. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching TV details:", error.message);
        return null; // Return null if there's an error
    }
}

export async function fetchTvCast(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/${id}/credits?api_key=${process.env.API_KEY}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch TV cast. Status: ${res.status}`);
        }

        const data = await res.json();
        return data.cast; // Returning only the cast array
    } catch (error) {
        console.log("Error fetching TV cast:", error.message);
        return null; // Return null if there's an error
    }
}

// Fetch TV Show Videos
export async function fetchTvVideos(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/${id}/videos?api_key=${process.env.API_KEY}`);

        if (!res.ok) throw new Error(`Failed to fetch TV videos. Status: ${res.status}`);

        const data = await res.json();
        return data.results; // returns an array of videos
    } catch (error) {
        console.log("Error fetching TV videos:", error.message);
        return [];
    }
}

// Fetch Similar TV Shows
export async function fetchSimilarTvShows(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/${id}/similar?api_key=${process.env.API_KEY}`);

        if (!res.ok) throw new Error(`Failed to fetch similar TV shows. Status: ${res.status}`);

        const data = await res.json();
        return data.results; // array of similar TV shows
    } catch (error) {
        console.log("Error fetching similar TV shows:", error.message);
        return [];
    }
}

// Fetch TV Show Recommendations
export async function fetchTvRecommendations(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/${id}/recommendations?api_key=${process.env.API_KEY}`);

        if (!res.ok) throw new Error(`Failed to fetch TV recommendations. Status: ${res.status}`);

        const data = await res.json();
        return data.results; // array of recommended TV shows
    } catch (error) {
        console.log("Error fetching TV recommendations:", error.message);
        return [];
    }
}

// Fetch TV Show Reviews
export async function fetchTvReviews(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/${id}/reviews?api_key=${process.env.API_KEY}`);

        if (!res.ok) throw new Error(`Failed to fetch TV reviews. Status: ${res.status}`);

        const data = await res.json();
        return data.results; // array of reviews
    } catch (error) {
        console.log("Error fetching TV reviews:", error.message);
        return [];
    }
}
