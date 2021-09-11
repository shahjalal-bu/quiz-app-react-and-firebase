import { useMemo } from "react";
import successImage from "../image/success.png";
import useFetch from "../Hooks/useFetch";
import styles from "../styles/summary.module.css";

export default function Summary({ score, noq }) {
  const getKeyword = useMemo(() => {
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  }, [score, noq]);

  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
    "GET",
    {
      Authorization: process.env.REACT_APP_PEXELS_API_KEY,
    }
  );
  console.log(result);
  const image = result ? result?.photos[0].src.medium : successImage;
  
  return (
    <div className={styles.summary}>
      <div className={styles.point}>
        <p className={styles.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={styles.badge}>Loading your badge...</div>}

      {error && <div className={styles.badge}>An error occured!</div>}

      {!loading && !error && (
        <div className={styles.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}