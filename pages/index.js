import { gql, GraphQLClient } from "graphql-request";
import Section from "@edgard/components/Section";
import NavBar from "@edgard/components/NavBar";
import Link from "next/link";
import { useRef } from "react";

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

  const drama = useRef()
  const epic = useRef()
  const thriller = useRef()
  const classic = useRef()
  const comedy = useRef()

  const drama1 = drama.current?.offsetTop
  const epic1 = epic.current?.offsetTop
  const thriller1 = thriller.current?.offsetTop
  const classic1 = classic.current?.offsetTop
  const comedy1 = comedy.current?.offsetTop

  const handleScroll = (ref) => {
    if(ref === drama){
      window.scrollTo(0, drama1)
    } else if( ref === epic){
      window.scrollTo(0,epic1)
    } else if (ref === thriller){
      window.scrollTo(0,thriller1)
    } else if (ref === classic){
      window.scrollTo(0,classic1)
    } else if (ref === comedy){
      window.scrollTo(0,comedy1)
    }
  }


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
          <div onClick={() => handleScroll(drama)} className="franchise">🎭</div>
          <div onClick={() => handleScroll(epic)} className="franchise">⚔️</div>
          <div onClick={() => handleScroll(thriller)} className="franchise">🙀</div>
          <div onClick={() => handleScroll(classic)} className="franchise">🏛️</div>
          <div onClick={() => handleScroll(comedy)} className="franchise">🤣</div>
        </div>
        
          <Section genre={"Recomended for you"} videos={unSeenVideos(videos)}/>
          <Section refe={drama} id="drama" genre={"Drama"} videos={filterVideos(videos, "Drama")}/>
          <Section refe={epic} id="epic" genre={"Epic"} videos={filterVideos(videos, "Epic")}/>
          <Section refe={thriller} id="thriller" genre={"Thriller"} videos={filterVideos(videos, "Thriller")} />
          <Section refe={classic} id="classic" genre={"Classic"} videos={filterVideos(videos, "Classic")} />
          <Section refe={comedy} id="comedy" genre={"Comedy"} videos={filterVideos(videos, "Comedy")} />
          <Section genre={"Animation"} videos={filterVideos(videos, "Animation")} />
        
      </div>
    </>
  );
};

export default Home;
