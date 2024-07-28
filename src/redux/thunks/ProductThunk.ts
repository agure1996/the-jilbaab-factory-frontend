import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Product from "../../interfaces/Product";

export const ProductThunk: any = createAsyncThunk<Product[]>(
  "products/productsFetch",
  async (_, { rejectWithValue }) => {
    try {
      const URL = `"http://localhost:5000/products"`;
      const response = await axios.get(URL);
      return response.data;
    } catch (err: any) {
      return rejectWithValue("An Error Occurred");
    }
  }
);

/*
const extradetailsNotNeeded =  {
 {   const USER_TOKEN = 825432924356621;
    const SECRET ='8no6s8kpOB-sbd4NZ2O517UsMUw';
    const AuthStr:string = 'Bearer '.concat(USER_TOKEN.toString(),SECRET); 
    const headers = {
      'x-api-key':AuthStr
    },
    const response = await axios.get(URL,{ headers});
  }}
*/
