import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import extraReducers from "./AuthReducers";

const initialState = {
  isLoading: false,
  isError: false,
  user: null,
};

export const signUpApi = createAsyncThunk("auth/signup", async (payload) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      { email: payload.email, password: payload.password,role:"user" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res)
    const data = await res.data;
    console.log("signup api data: ",data)
    return {data}
  } catch (err) {
    console.error("Error", err.message);
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers,
});
export const user=(state)=>state.AuthSlice.user;
export default AuthSlice.reducer;
