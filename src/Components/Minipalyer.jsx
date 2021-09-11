import React, { useRef, useState } from "react";
import styles from "../styles/miniplayer.module.css";
import ReactPlayer from 'react-player';
const Minipalyer = ({id,title}) => {

  //work for mini playery

  const buttonRef = useRef();
  const [status, setStatus] = useState(false);

  //handle mini palyer

  function toggleMiniPlayer() {
    if (!status) {
      buttonRef.current.classList.remove(styles.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(styles.floatingBtn);
      setStatus(false);
    }
  }

  return (
    <>
      <div className={`${styles.miniPlayer} ${styles.floatingBtn}`} ref={buttonRef}>
        <span
          className={`material-icons-outlined ${styles.open}`}
          onClick={toggleMiniPlayer}
        >
          play_circle_filled
        </span>
        <span
          onClick={toggleMiniPlayer}
          className={`material-icons-outlined ${styles.close}`}
        >
          close
        </span>
        <ReactPlayer 
        url ={`https://youtube.com/watch/${id}`}
        width="300px"
        height='168px'
        playing={status}
        className={styles.player}
        
        />
        <p>{title}</p>
      </div>
    </>
  );
};

export default Minipalyer;
