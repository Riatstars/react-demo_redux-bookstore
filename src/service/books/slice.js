import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";
import { useDispatch } from "react-redux";

const initialState = {
  books: [],
  pageNum: 2,
  totalPage: 10,
  limit: 10,
  status: "idle",
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ limit, pageNum, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const res = await api.get(url);
    return res.data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setPageNum } = booksSlice.actions;
export default booksSlice.reducer;
