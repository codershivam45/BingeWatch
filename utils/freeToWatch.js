'use server'

export async function fetchFreeMoviesOrTV({ media_type }) {
    try {
        // const page = Math.floor(Math.random() * 50) + 1;
        // Generates a random number between 1 and 50

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover/${media_type}?api_key=${process.env.API_KEY}&with_watch_monetization_types=free&watch_region=US`);

        if (!res.ok) {
            throw new Error(`Failed to fetch ${media_type}. Status: ${res.status}`);
        }

        const data = await res.json();
        return data.results;
    } catch (error) {
        console.log("Error fetching free movies or TV shows:", error.message);
        return [];
    }
}
