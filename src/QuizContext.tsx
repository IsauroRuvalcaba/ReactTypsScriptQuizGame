import { createContext, useContext, useReducer } from "react";

export interface Question {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QustionResponse {
  response_code: number;
  results: Question[];
}

// created this to be able to import the QuizContext to other files. Added this as type to that
interface QuizContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

type Status = "idle" | "fetching" | "ready" | "error";

interface QuizState {
  question: Question | null;
  gameStatus: Status;
  userAnswer: string | null;
}

const initialState: QuizState = {
  gameStatus: "idle",
  question: null,
  userAnswer: null,
};

type QuizAction =
  | { type: "setStatus"; payload: Status }
  | { type: "setQuestion"; payload: Question }
  | { type: "setUserAnswer"; payload: string };

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
    case "setQuestion":
      return { ...state, question: action.payload };
    case "setStatus":
      return { ...state, gameStatus: action.payload };
    case "setUserAnswer":
      return { ...state, userAnswer: action.payload };

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
    question: null,
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
        case "setQuestion":
            return Object.assign(Object.assign({}, state), { question: action.payload });
        case "setStatus":
            return Object.assign(Object.assign({}, state), { gameStatus: action.payload });
        default:
            throw new Error("Unknown action");
    }
}

*/
