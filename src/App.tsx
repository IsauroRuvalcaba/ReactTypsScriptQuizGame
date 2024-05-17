import "./App.scss";
import Score from "./components/Score.tsx";
import Game from "./components/Game.tsx";
import { useQuiz } from "./QuizContext.tsx";

function App() {
  const { state, dispatch } = useQuiz();

  console.log(state);

  return (
    <>
      <Score />
      <Game />
      <h2>Status: {state.gameStatus}</h2>
      <button
        onClick={() => {
          dispatch({ type: "setStatus", payload: "fetching" });
        }}
      >
        Set Loading
      </button>
    </>
  );
}

export default App;
