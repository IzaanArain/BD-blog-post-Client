import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import extraReducers from "../../hooks/UseReducers";
import { toast } from "react-toastify";

// const user= JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : "";
// const token = user?.user_auth;
// axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
// console.log("auth",axios.defaults.headers.common)

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}api/v1/`;
// console.log("url",axios.defaults.baseURL);

const initialState = {
  isLoading: false,
  isError: false,
  user: null,
};

export const signUpApi = createAsyncThunk(
  "auth/signup",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `user/register`,
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
        `user/otp_verify`,
        {
          email: payload.email,
          otp_code: payload.otp_code,
        },
        { new: true }
      );
      const data = await res.data;
      // console.log(data)
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
        `user/login`,
        { email: payload.email, password: payload.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      // console.log("login api data: ", data);
      return { data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const ForgotPasswordApi = createAsyncThunk(
  "auth/forgot_password",
  async (payload, thunkAPI) => {
    try {
      const res = axios.post(
        `user/forgot_password`,
        {
          email: payload.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      return { data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetPasswordApi = createAsyncThunk(
  "auth/reset_password",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `user/reset_password`,
        {
          email: payload.email,
          password: payload.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      return { data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const completeProfileApi = createAsyncThunk(
  "auth/complete_profile",
  async (payload, thunkAPI) => {
    try {
      // console.log("payload",payload)
      const res = await axios.post(`user/complete_profile`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          // authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
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
      localStorage.removeItem("user");
      // localStorage.removeItem("persist:blog-user");
      // toast.success(`logout successful`, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    },
  },
  extraReducers,
});
export const loggedInUser = (state) => state?.auth?.user;
export const signUpUser = (state) => state?.auth?.user;
export const otpVerifyUser = (state) => state?.auth?.user;

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
