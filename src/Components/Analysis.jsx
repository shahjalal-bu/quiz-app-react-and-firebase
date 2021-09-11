import React from "react";
import styles from '../styles/analysis.module.css'
import Questions from "./Questions";

const Analysis = ({answers}) => {
  return (
    <div>
    <div className ={styles.analysis}>
          <h1>Question Analysis</h1>
          <Questions answers ={answers}/>
    </div>
  </div>
  )
};

export default Analysis;
