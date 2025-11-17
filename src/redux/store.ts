import { createStore, combineReducers } from "redux";
import { countriesReducer } from "./reducers/countriesReducer";

const rootReducer = combineReducers({
  countries: countriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer);




