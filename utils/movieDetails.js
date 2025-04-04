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
