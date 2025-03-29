import { fetchMovieDetails } from './movieDetails';

export async function generateMovieMetadata(params) {
    const param=await params
    console.log(param)
    const id = params.id?.split('-')[0]; // Extract the movie ID from the URL parameter
    const movie = await fetchMovieDetails(id);

    return {
        title: `${movie.title ? movie.title : ''} ${movie.release_date ? (movie.release_date.slice(0, 4)) :''}  BingeWatch`, // Movie title with year
        description: movie.overview, // Movie overview
        openGraph: {
            title: `${movie.title} (${movie.release_date?.slice(0, 4)}) - BingeWatch`, // OpenGraph title
            description: movie.overview, // OpenGraph description
            images: [`https://image.tmdb.org/t/p/original/${movie.poster_path}`], // OpenGraph image (poster)
        },
    };
}

