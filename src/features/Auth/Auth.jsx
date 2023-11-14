import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import extraReducers from "./AuthReducers";

const initialState = {
  isLoading: false,
  isError: false,
  user: null,
};

const url = `http://localhost:5000/api/v1/user`;

export const signUpApi = createAsyncThunk(
  "auth/signup",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `${url}/register`,
        { email: payload.email, password: payload.password, role: "user" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      // console.log("signup api data: ", data);
      return { data: data };
    } catch (err) {
      // console.error("Error", err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginApi = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const res = await axios.post(
      `${url}/login`,
      { email: payload.email, password: payload.password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.data;
    localStorage.setItem("user", JSON.stringify(user));
    return { data };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers,
});
export const signUpUser = (state) => state?.auth?.user;
export default AuthSlice.reducer;
