'use server'

export async function fetchPersonId({ name }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/person?api_key=${process.env.API_KEY}&query=${name}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch person ID. Status: ${res.status}`);
        }

        const data = await res.json();
        if (!data.results || data.results.length === 0) {
            throw new Error("Person not found.");
        }

        return data.results[0].id;
    } catch (error) {
        console.log("Error fetching person ID:", error.message);
        return null; // Return null to handle gracefully if the person is not found
    }
}

export async function fetchPersonDetails(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/person/${id}?api_key=${process.env.API_KEY}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch person details. Status: ${res.status}`);
        }

        const data = await res.json();
        if (!data || !data.id) {
            throw new Error("Person details not found.");
        }

        console.log(data);
        return data;
    } catch (error) {
        console.log("Error fetching person details:", error.message);
        return null; // Return null if details can't be fetched
    }
}

export async function fetchPersonCredits(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/person/${id}/movie_credits?api_key=${process.env.API_KEY}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch person credits. Status: ${res.status}`);
        }

        const data = await res.json();
        if (!data || !data.cast) {
            throw new Error("No credits found.");
        }

        console.log(data);
        return data;
    } catch (error) {
        console.log("Error fetching person credits:", error.message);
        return null; // Return null if credits can't be fetched
    }
}
