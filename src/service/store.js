import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/slice";
import readingReducer from "./reading/slice";

export const store = configureStore({
  reducer: combineReducers({
    books: booksReducer,
    reading: readingReducer,
  }),
});
