'use server'

export async function fetchPersonId({name}){

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/person?api_key=${process.env.API_KEY}&query=${name}`)
    const data=await res.json()
    return data.results[0].id
}

export async function fetchPersonDetails(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/person/${id}?api_key=${process.env.API_KEY}`)
    const data=await res.json()
    console.log(data)
    return data
}

export async function fetchPersonCredits(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/person/${id}/movie_credits?api_key=${process.env.API_KEY}`)
    const data=await res.json()
    console.log(data)
    return data
}