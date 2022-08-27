import { createSlice, createAsyncThunk,  PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


type Pizza = {
  id: string;
  title: string;
  price: number;
  image: string;
  sizes: number[];
  types: number[];
  rating: number;
}

interface PizzaSliceState {
  items: Pizza[]
}

const initialState: PizzaSliceState = {
  items: [],
};

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
}


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams> ("pizza/fetchPizzasStatus", async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const res = await axios.get<Pizza[]>(
    `https:62f4c3c7535c0c50e761b9aa.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return res.data;
}
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    getItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = []
    })
  }
});

export const { getItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
