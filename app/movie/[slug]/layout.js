import { generateTvMetadata } from '@/utils/tvMetaDetails';

// Generate metadata from the utility file
export async function generateMetadata({ params }) {
    return await generateTvMetadata(params);
}

const TvLayout = ({ children }) => {
    return <>{children}</>;
};

export default TvLayout;

