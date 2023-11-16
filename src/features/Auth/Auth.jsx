import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import extraReducers from "../UseReducers";
import OtpVerify from "../../pages/OtpVerify";

const initialState = {
  isLoading: false,
  isError: false,
  object: null,
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

export const OtpVerifyApi = createAsyncThunk(
  "auth/otpverify",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `${url}/otp_verify`,
        {
          email: payload.email,
          otp_code: payload.otp_code,
        },
        { new: true }
      );
      const data = await res.data;
      console.log(data)
      return { data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginApi = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
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
      // console.log("login api data: ", data);
      // const user = data?.user;
      // localStorage.setItem("user", JSON.stringify(user));
      return { data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      localStorage.removeItem("persist:blog-user");
    },
  },
  extraReducers,
});
export const loggedInUser = (state) => state?.auth?.user;
export const signUpUser = (state) => state?.auth?.user;
export const otpVerifyUser = (state) => state?.auth?.user;

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
