import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";

import reposReducer from "./reposReducer";

const rootReducer = combineReducers({
    repos: reposReducer,
});

// const store = creat
