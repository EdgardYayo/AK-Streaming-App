import { gql, GraphQLClient } from "graphql-request";
import Section from "@edgard/components/Section";
import NavBar from "@edgard/components/NavBar";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const query = gql`
    query {
      videos {
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
  `;
  const data = await graphQLClient.request(query);
  const videos = data.videos;
  return {
    props: {
      videos,
    },
  };
};

const Home = ({ videos }) => {
  console.log(videos);

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };


  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }


  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null)
  }

  return (
    <>
      <NavBar/>
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>

        <div className="video-feed">
          <Section genre={"Recomended for you"} videos={unSeenVideos(videos)}/>
          <Section genre={"Drama"} videos={filterVideos(videos, "Drama")}/>
          <Section genre={"Epic"} videos={filterVideos(videos, "Epic")}/>
          <Section genre={"Thriller"} videos={filterVideos(videos, "Thriller")} />
          <Section genre={"Classic"} videos={filterVideos(videos, "Classic")} />
          <Section genre={"Unknown"} videos={filterVideos(videos, "Unknown")} />
          <Section genre={"Unknown"} videos={filterVideos(videos, "Unknown")} />
        </div>
      </div>
    </>
  );
};

export default Home;
