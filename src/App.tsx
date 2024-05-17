import { useEffect } from "react";
import "./App.scss";
import FullPageLoader from "./components/FullPageLoader.tsx";
import Score from "./components/Score.tsx";
import Game from "./components/Game.tsx";
import { useQuiz, Question, QustionResponse } from "./QuizContext.tsx";

function App() {
  const { state, dispatch } = useQuiz();

  // console.log(state);

  async function fetchQuestion() {
    try {
      dispatch({ type: "setStatus", payload: "fetching" });
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&category=18"
      );

      let data: QustionResponse = await response.json();

      if (data.response_code === 0) {
        let question: Question = data.results[0];
        dispatch({ type: "setStatus", payload: "ready" });
        console.log(question);

        // add question to the context
      } else {
        dispatch({ type: "setStatus", payload: "error" });
      }
    } catch (err) {
      console.log("error: ", err);
      dispatch({ type: "setStatus", payload: "error" });
    }
  }

  useEffect(() => {
    if (state.gameStatus == "idle") {
      fetchQuestion();
    }
  });

  return (
    <>
      {state.gameStatus == "fetching" ? (
        <FullPageLoader />
      ) : state.gameStatus == "error" ? (
        <p>Error...</p>
      ) : state.gameStatus == "ready" ? (
        <>
          <Score />
          <Game />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
