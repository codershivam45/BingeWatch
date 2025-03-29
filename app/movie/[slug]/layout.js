import { generateMovieMetadata } from "@/utils/movieMetaData";
// Generate metadata from the utility file
export async function generateMetadata({ params }) {
    return await generateMovieMetadata(params);
}

const MovieLayout = ({ children }) => {
    return <>{children}</>;
};

export default MovieLayout;

