import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/slice";

export const store = configureStore({
  reducer: combineReducers({
    books: booksReducer,
  }),
});
