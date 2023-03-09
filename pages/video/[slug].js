import { gql, GraphQLClient} from "graphql-request";
import { useState } from "react";

export const getServerSideProps = async (pageContext) => {
    const url = process.env.ENDPOINT
    const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
  })

    const pageSlug = pageContext.query.slug

    const query = gql`
        query ($pageSlug: String!) {
            video(where: {slug: $pageSlug }) {
            createdAt
            id
            title
            description
            seen
            slug
            tags
            thumbnail {
                url
            }
            mp4 {
                url
            }
            }
        }
    `

    const variables = {
        pageSlug,
    }

    const data = await graphQLClient.request(query, variables)
    const video = data.video

    return {
        props: {
            video
        }
    }

}

const Video = ({ video }) => {
    const [watching, setWatching] = useState(false)
    return (
        <>
            { !watching && <img className="video-image" src={video.thumbnail.url}
            alt={video.title}/> }
            { !watching && <div className="info">
                <p>{video.tags.join(", ")}</p>
                <p>{video.description}</p>
                <a href="/"><p>go back</p></a>
                <button
                    className="video-overlay"
                    onClick={() => {
                        watching ? setWatching(false) : setWatching(true); 
                    }}
                >Play</button> 
            </div> }
            { watching && (
                <video width="100%" controls>
                    <source src={video.mp4.url} type="video/mp4"/>
                </video>
            )}
            <div className="info-footer"
            onClick={() => watching ? setWatching(false) : null }></div>
        </>
    )
}

export default Video;