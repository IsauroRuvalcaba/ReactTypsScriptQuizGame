import "./Game.scss";
import AnswerOption from "./AnswerOption.tsx";
import Result from "./Result.tsx";
import { useQuiz } from "../QuizContext.tsx";
import { decode } from "html-entities";

function Game() {
  const { dispatch, state } = useQuiz();
  console.log(state);

  return (
    <>
      <div className="container game-screen">
        <h2>Question</h2>
        <h4>{decode(state.question?.question)}</h4>
        <div className="options">
          {state.question?.incorrect_answers.map((answer) => {
            return <AnswerOption key={answer} answer={answer} />;
          })}
        </div>

        {/* This below is called Declaritive UI - go to react docs for more info */}

        {state.userAnswer && state.gameStatus != "answered" && (
          <button
            onClick={() => {
              dispatch({ type: "setStatus", payload: "answered" });
            }}
          >
            Submit
          </button>
        )}

        {state.gameStatus == "answered" && (
          <>
            <Result />
            <button
              onClick={() => {
                dispatch({ type: "setStatus", payload: "idle" });
              }}
            >
              Next Question
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Game;
