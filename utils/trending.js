'use server'

export async function fetchTrendingMovies({media_type ,time_window}) { 
    const res =await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/trending/${media_type}/${time_window}?api_key=${process.env.API_KEY}`)
    const data=await res.json()
    // console.log(data)
    return data
}
