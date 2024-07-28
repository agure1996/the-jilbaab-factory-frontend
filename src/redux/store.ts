import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slices/ProductSlice";
import { ProductThunk } from "./thunks/ProductThunk";
import { productsApi } from "./api/productsApi";
import CartReducer, { getTotals } from "./slices/CartSlice";
import AuthReducer, { loadUser } from "./slices/AuthSlice";

export const store: any = configureStore({
  reducer: {
    auth:AuthReducer,
    cart: CartReducer,
    products: ProductReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(ProductThunk());
store.dispatch(getTotals());
store.dispatch(loadUser());


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
