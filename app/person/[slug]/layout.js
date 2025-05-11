// export function
export function generateMetadata({params}){
    const slug=params.slug
    const title=slug.split('-')[1].replaceAll("%20", " ")

    return {title:title}
}
const PersonLayout = ({ children }) => {
    return <>{children}</>
}

export default PersonLayout;