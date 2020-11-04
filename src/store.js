import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import countries from "./reducers/countries";
import detail from "./reducers/detail";

const reducer = combineReducers({ countries, detail });

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;