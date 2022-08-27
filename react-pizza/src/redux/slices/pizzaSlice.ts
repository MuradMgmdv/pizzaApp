import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk ("pizza/fetchPizzasStatus", async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const res = await axios.get(
      `https:62f4c3c7535c0c50e761b9aa.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data;
  }
);

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    getItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    // [fetchPizzas.pending]: (state, action) => {
    //   console.log("pending");
    // },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log("rejected_FetchPizzas");
    },
  },
});

export const { getItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
