import { gql, GraphQLClient } from "graphql-request";
import Section from "@edgard/components/Section";
import NavBar from "@edgard/components/NavBar";
import Link from "next/link";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const videoQuery = gql`
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
  `

 const accountQuery = gql`
  query {
    account(where: { id : "clez7o9vofxyy0alo3b1xbvuk"}){
      username
      avatar {
        url
      }
    }
  }
 `



  const data = await graphQLClient.request(videoQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account


  return {
    props: {
      videos,
      account
    },
  };
};

const Home = ({ videos, account }) => {
  // console.log(videos);
  // console.log(account);

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
      <NavBar account={account}/>
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>

        <div className="video-feed">
          <Link href="#drama"><div className="franchise" id="drama"></div></Link>
          <Link href="#epic"><div className="franchise" id="epic"></div></Link>
          <Link href="#thriller"><div className="franchise" id="thriller"></div></Link>
          <Link href="#classic"><div className="franchise" id="classic"></div></Link>
          <Link href="#unknown"><div className="franchise" id="unknown"></div></Link>
        </div>
        
          <Section genre={"Recomended for you"} videos={unSeenVideos(videos)}/>
          <Section id="drama" genre={"Drama"} videos={filterVideos(videos, "Drama")}/>
          <Section id="epic" genre={"Epic"} videos={filterVideos(videos, "Epic")}/>
          <Section id="thriller" genre={"Thriller"} videos={filterVideos(videos, "Thriller")} />
          <Section id="classic" genre={"Classic"} videos={filterVideos(videos, "Classic")} />
          <Section id="unknown" genre={"Unknown"} videos={filterVideos(videos, "Unknown")} />
          <Section genre={"Unknown"} videos={filterVideos(videos, "Unknown")} />
        
      </div>
    </>
  );
};

export default Home;
