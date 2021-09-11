import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router";
import useQuestionList from "../Hooks/useQuestionList";
import Answers from "./Answers";
import Minipalyer from "./Minipalyer";
import ProgressBar from "./ProgressBar";
import _ from "lodash";
import { getDatabase, ref, set } from "@firebase/database";
import { useAuth } from "../contexts/AuthContext";
const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

const Quiz = () => {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { loading, error, questions } = useQuestionList(id);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const history = useHistory();
  const {location} = history;
  const {title} = location;
  
 
  

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  //handle when user clicks next button
  function nextQuestion() {
    if (currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }
  //handle when user clicks prev button

  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  }
  //calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  //handle submit button
  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    history.push({
      pathname: `/result/${id}`,
      state:{
        qna
      }

    });
  }
  return (
    <>
      {error && <div>There was an error!</div>}
      {loading && <div>Loading</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
            input={true}
          />
          <ProgressBar
            prev={prevQuestion}
            next={nextQuestion}
            progress={percentage}
            submit={submit}
          />
          <Minipalyer id={id} title={title}/>}/>
        </>
      )}
    </>
  );
};

export default Quiz;
