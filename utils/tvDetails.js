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
