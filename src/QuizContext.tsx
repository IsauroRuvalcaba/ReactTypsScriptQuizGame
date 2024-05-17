import { createContext, useContext, useReducer } from "react";

// created this to be able to import the QuizContext to other files. Added this as type to that
interface QuizContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

type Status = "idle" | "fetching" | "ready";

interface QuizState {
  gameStatus: Status;
}

const initialState: QuizState = {
  gameStatus: "idle",
};

type QuizAction = { type: "setStatus"; payload: Status };

const QuizContext = createContext<QuizContext>({
  state: initialState,
  dispatch: () => null,
});

export function QuizProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}

function QuizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "setStatus":
      return { ...state, gameStatus: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

/* 

*
*
* Actual js code

import { createContext, useContext, useReducer } from "react";
const initialState = {
    gameStatus: "idle",
};
const QuizContext = createContext({
    state: initialState,
    dispatch: () => null,
});
export function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(QuizReducer, initialState);
    return (React.createElement(QuizContext.Provider, { value: { state, dispatch } }, children));
}
export function useQuiz() {
    return useContext(QuizContext);
}
function QuizReducer(state, action) {
    switch (action.type) {
        case "setStatus":
            return Object.assign(Object.assign({}, state), { gameStatus: action.payload });
        default:
            throw new Error("Unknown action");
    }
}

*/
