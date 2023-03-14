import Card from "./Card";

const Section = ({ genre, videos, refe }) => {
    return (
        <div className="section">
            <h3 ref={refe}>{genre}</h3>
            <div className="thumbnail-wrapper">
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail}/>
                    </a>
                ))}
            </div>
        </div>
    )
}


export default Section;