import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Link } from "react-router-dom";
import useVideoList from "../Hooks/useVideoList";
import Video from "./Video";

const Videos = () => {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
        >
          {videos.map((video, index) => (
            <Link to={{
              pathname:`/quiz/${video.youtubeID}`,
              title:`${video.title}`
            }} key={index}>
              <Video title={video.title} id={video.youtubeID} noq={video.noq} />
            </Link>
          ))}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading</div>}
    </div>
  );
};

export default Videos;
