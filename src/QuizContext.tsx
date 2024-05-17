import { createContext, useContext, useState } from "react";

interface QuizState {
  gameStatus: "idle" | "fetching" | "ready";
}

const initialState: QuizState = {
  gameStatus: "idle",
};

const QuizContext = createContext<QuizState>(initialState);

/* 

*
*
* Actual js code

import { createContext } from "react";
const initialState = {
    gameStatus: "idle",
};
const QuizContext = createContext(initialState);

*/
