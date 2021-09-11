import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByKey,
  get,
  startAt,
  limitToFirst
} from "firebase/database";
const useVideoList = (page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    //database related work
    async function fetchVideos() {
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(videosRef, orderByKey(), startAt("" +page),
      limitToFirst(8));
      try {
        setError(false);
        setLoading(true);
        //request firebase database
        const snapshot = await get(videoQuery);
        setLoading(false);

        //don't understand
        if (snapshot.exists()) {
          setVideos((preVideos) => {
            return [...preVideos, ...Object.values(snapshot.val())];
          });
        } else {
          setHasMore(false)
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchVideos();
  }, [page]);
  return {
    loading,
    error,
    videos,
    hasMore
  };
};

export default useVideoList;
