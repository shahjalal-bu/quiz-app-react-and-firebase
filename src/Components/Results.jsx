import React from "react";
import { useHistory, useParams } from "react-router";
import useAnswers from "../Hooks/useAnswers";
import Analysis from "./Analysis";
import Summary from "./Summary";
import _ from "lodash";

const Results = () => {
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;
  const { loading, error, answers } = useAnswers(id);
  //calculate result
  function calculate() {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndexes = [];
      let checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });
    return score;
  }
  const userScore = calculate();
  console.log(userScore);
  return (
    <>
      {loading && <div>Loading</div>}
      {error && <div>There how an error</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score ={userScore} noq={answers.length}/>
          <Analysis answers={answers}/>
        </>
      )}
    </>
  );
};

export default Results;
