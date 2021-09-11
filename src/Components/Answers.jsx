import React, { Fragment } from "react";
import Checkbox from "./Checkbox";
import styles from "../styles/answer.module.css";

const Answers = ({ options = [], handleChange, input }) => {
  return (
    <>
      <div className={styles.answers}>
        {options.map((option, index) => (
          <Fragment key={index}>
            {input ? (
              <Checkbox
                key={index}
                className={styles.answer}
                text={option.title}
                value={index}
                checked={option.checked}
                onChange={(e) => handleChange(e, index)}
              />
            ) : (
              <Checkbox
                key={index}
                className={`${styles.answer} ${
                  option.correct
                    ? styles.correct
                    : option.checked
                    ? styles.wrong
                    : null
                }`}
                text={option.title}
                defaultChecked={option.checked}
                disabled
              />
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default Answers;


