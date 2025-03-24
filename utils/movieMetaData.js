import { fetchTvDetails } from './tvDetails';

export async function generateTvMetadata(params) {
    const id = params.slug.split('-')[0]; // Extract the TV show ID from the slug
    const tvShow = await fetchTvDetails(id);

    return {
        title: `${tvShow.name} (${tvShow.first_air_date.slice(0, 4)}) - BingeWatch`, // Title with year
        description: tvShow.overview, // TV show overview
        openGraph: {
            title: `${tvShow.name} (${tvShow.first_air_date.slice(0, 4)}) - BingeWatch`, // OpenGraph title
            description: tvShow.overview, // OpenGraph description
            images: [`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`], // OpenGraph image (poster)
        },
    };
}
