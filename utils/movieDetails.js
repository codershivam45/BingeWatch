'use server'

export async function fetchMovieDetails(id){

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}?api_key=${process.env.API_KEY}`)
    const data = await res.json()
    console.log(data)
    return data;
}

export async function fetchCast(id){

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/credits?api_key=${process.env.API_KEY}`)
    const data= await res.json()
    console.log(data.cast)
    return data
}