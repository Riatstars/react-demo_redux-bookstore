import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";

const initialState = {
  books: [],
  showingBook: {},
  pageNum: 1,
  totalPage: 10,
  limit: 10,
  status: "idle",
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ limit, pageNum, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) {
      url += `&q=${query}`;
    }
    const res = await api.get(url);
    return res.data;
  }
);
export const getBook = createAsyncThunk("books/getBook", async (bookId) => {
  let url = `/books/${bookId}`;
  const res = await api.get(url);
  console.log(res.data);
  return res.data;
});

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
      })
      .addCase(getBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.showingBook = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setPageNum } = booksSlice.actions;
export default booksSlice.reducer;
