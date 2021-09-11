import { useEffect, useState } from "react";
import { getDatabase, ref, query, orderByKey, get } from "firebase/database";
const useQuestionList = (videoId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    //database related work
    async function fetchQuestion() {
        const db = getDatabase();
        const quizRef = ref(db, "quiz/" + videoId + "/questions");
        const quizQuery = query(quizRef, orderByKey());
  
      try {
        setError(false);
        setLoading(true);
        //request firebase database
        const snapshot = await get(quizQuery);
        setLoading(false);
        //don't understand
        if (snapshot.exists()) {
          setQuestions((preQuestions) => {
            return [...preQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchQuestion();
  }, [videoId]);
  return {
    loading,
    error,
    questions,
  };
};

export default useQuestionList;
