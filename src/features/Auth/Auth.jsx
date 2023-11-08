import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const signUpApi = createAsyncThunk("auth/signup", async () => {
  try {
    const res=await axios.post();
  } catch (err) {
    console.error("Error",err.message);
  }
});

const initialState = {
  isLoading: false,
  isError: false,
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default AuthSlice.reducer;
