import React, { useRef, useState } from "react";
import styles from "../styles/progressbar.module.css";
import Button from "./Button";
const ProgressBar = ({ prev, next, progress, submit }) => {
  const tooltipRef = useRef();
  const [tooltip, setTooltip] = useState(false);
  function toogleTooltip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = "block";
    }
  }
  return (
    <>
      <div className={styles.progressBar}>
        <div className={styles.backButton} onClick={prev}>
          <span className="material-icons-outlined"> arrow_back </span>
        </div>
        <div className={styles.rangeArea}>
          <div className={styles.tooltip} ref={tooltipRef}>
            {`${progress}%`} Cimplete!
          </div>
          <div className={styles.rangeBody}>
            <div
              onMouseOver={toogleTooltip}
              onMouseOut={toogleTooltip}
              className={styles.progress}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <Button
          className={`${styles.button} ${styles.next}`}
          onClick={progress !== 100 ? next : submit}
        >
          <span>{progress !== 100 ? "Next Question" : "Submit"}</span>
          <span className="material-icons-outlined"> arrow_forward </span>
        </Button>
      </div>
    </>
  );
};

export default ProgressBar;
