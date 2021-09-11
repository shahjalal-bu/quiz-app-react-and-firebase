import React from "react";
import Answers from "./Answers";
import styles from "../styles/question.module.css";

const Questions = ({ answers = [] }) => {
  return answers.map((answer, index) => (
    <div className={styles.question} key={index}>
    <div className={styles.qtitle}>
      <span className="material-icons-outlined"> help_outline </span>
      {answer.title}
    </div>
    <Answers input={false} options={answer.options}/>
  </div>
  ));
};

export default Questions;
