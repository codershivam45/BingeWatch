'use server'

export async function fetchTrendingMovies({ media_type, time_window }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trending/${media_type}/${time_window}?api_key=${process.env.API_KEY}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch trending movies. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching trending movies:", error.message);
        return null; // Return null to gracefully handle errors
    }
}
