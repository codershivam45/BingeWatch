'use server'

export async function fetchTvDetails(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/${id}?api_key=${process.env.API_KEY}`);
    const data = await res.json();
    // console.log(data); // For debugging, you can remove this in production
    return data;
}

export async function fetchTvCast(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tv/${id}/credits?api_key=${process.env.API_KEY}`);
    const data = await res.json();
    // console.log(data.cast); // For debugging, you can remove this in production
    return data.cast; // Returning only the cast array
}
