// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const loggerMiddleware = createLogger();

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

//const store = createStore(rootReducer, composeWithDevTools());

//const store = createStore(rootReducer);


export default store;
