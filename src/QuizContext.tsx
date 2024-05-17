import { createContext, useContext, useState } from "react";

interface QuizState {
  gameStatus: "idle" | "fetching" | "ready";
}

const initialState: QuizState = {
  gameStatus: "idle",
};

const QuizContext = createContext<QuizState>(initialState);

export function QuizProvider({ children }: { children: React.ReactElement }) {
  const [state, setState] = useState(initialState);

  // the {children} is where <App/> goes when imported in the main.tsx
  return <QuizContext.Provider value={state}>{children}</QuizContext.Provider>;
}

// this will allow any file that imports this to access the state.  This is used instead of that file importing useContext and also importing QuizContext from this file
export function useQuiz() {
  return useContext(QuizContext);
}

/* 

*
*
* Actual js code

import { createContext, useContext, useState } from "react";
const initialState = {
    gameStatus: "idle",
};
const QuizContext = createContext(initialState);
export function QuizProvider({ children }) {
    const [state, setState] = useState(initialState);
    return React.createElement(QuizContext.Provider, { value: state }, children);
}

export function useQuiz() {
    return useContext(QuizContext);
}

*/
