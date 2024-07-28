import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductThunk } from "../thunks/ProductThunk";
import ProductState from "@interfaces/ProductState";
import Product from "@interfaces/Product";

const initialState: ProductState = {
  items: [],
  status: null,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(ProductThunk.pending, (state) => {
        state.status = "loading.."; // Update state.status to 'loading'
      })
      .addCase(
        ProductThunk.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded"; // Update state.status to 'succeeded' on successful fetch
          state.items = action.payload; // Update state.items with fetched data
        }
      )
      .addCase(
        ProductThunk.rejected,
        (state, action: PayloadAction<string>) => {
          state.status = "rejected"; // Update state.status to 'failed' if fetch fails
          state.error = action.payload;
        }
      );
  },
});

export default productsSlice.reducer;
