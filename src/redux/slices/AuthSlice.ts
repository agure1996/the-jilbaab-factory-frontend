import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./Api";
import { jwtDecode } from "jwt-decode";

// Define the User type
interface User {
  name: string;
  email: string;
  _id: string;
}

// Define the initial state type
interface AuthState {
  token: string | null;
  name: string;
  email: string;
  _id: string;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
  userLoaded: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

//when creating http request we create action creator here then handle it as builder.addcase

export const registerUser: any = createAsyncThunk(
  "auth/registerUser",
  async (
    values: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${url}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      const token = response.data;
      localStorage.setItem("token", token);
      return token;
    } catch (err: any) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser: any = createAsyncThunk(
  "auth/loginUser",
  async (
    values: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });

      const token = response.data;
      localStorage.setItem("token", token);
      return token;
    } catch (err: any) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state: any) {
      const token = state.token;
      if (token) {
        const user: User = jwtDecode(token);

        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
    logoutUser(state: any) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder /* cases for Registering */
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "Pending..";
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          const token = action.payload;
          if (token) {
            const user: User = jwtDecode<User>(token);
            state.token = token;
            state.name = user.name;
            state.email = user.email;
            state._id = user._id;
            state.registerStatus = "Success";
          }
        }
      )
      .addCase(registerUser.rejected, (state, action: any) => {
        state.registerStatus = "Rejected";
        state.registerError = action.payload;
      })
      /* cases for Logging in */
      .addCase(loginUser.pending, (state) => {
        state.registerStatus = "Pending..";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        const token = action.payload;
        if (token) {
          const user: User = jwtDecode<User>(token);
          state.token = token;
          state.name = user.name;
          state.email = user.email;
          state._id = user._id;
          state.registerStatus = "Success";
        }
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.registerStatus = "Rejected";
        state.registerError = action.payload;
      });
  },
});
export const { loadUser, logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
