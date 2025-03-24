'use server'

export async function fetchFreeMoviesOrTV({media_type}){

    const page=Math.floor(Math.random()*50)+1 ;
    // Generates a random number between 1 and 50

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover/${media_type}?api_key=${process.env.API_KEY}&page=${page}&with_watch_monetization_types=free&watch_region=US`)
    const data = await res.json()
    // console.log(data)
    return data.results;


} 