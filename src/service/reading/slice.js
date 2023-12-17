import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";

const initialState = {
  readings: [],
  status: "idle",
};

export const getReading = createAsyncThunk("favorites/getReading", async () => {
  let url = `/favorites`;
  const res = await api.get(url);
  return res.data;
});

export const addReading = createAsyncThunk(
  "favorites/addReading",
  async (book) => {
    const res = await api.post("/favorites", book);
    return res.data;
  }
);
export const removeReading = createAsyncThunk(
  "favorites/removeReading",
  async (bookId) => {
    const res = await api.delete("/favorites/" + bookId);
    return res.data;
  }
);

export const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReading.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReading.fulfilled, (state, action) => {
        state.status = "idle";
        state.readings = action.payload;
      })
      .addCase(getReading.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addReading.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReading.fulfilled, (state, action) => {
        state.status = "idle";
        state.readings.push(action.payload);
      })
      .addCase(addReading.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeReading.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeReading.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(removeReading.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default readingSlice.reducer;
