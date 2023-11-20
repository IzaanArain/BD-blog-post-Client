import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import extraReducers from "../../hooks/UseReducers";
import axios from "axios";

const data = JSON.parse(localStorage.getItem("persist:blog-user"))
  ? JSON.parse(localStorage.getItem("persist:blog-user"))
  : "";
const user = JSON.parse(data?.user) ? JSON.parse(data?.user) : "";
const token = user?.user_auth;

const initialState = {
  isLoading: false,
  isError: false,
  messages: null,
  users: null,
};

const url = `http://localhost:5000/api/v1/user`;

export const getAllUsersApi = createAsyncThunk(
  "auth/all_users",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get(`${url}/all_users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      console.log(data)
      return { data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers
});

export const getAllUsers = (state) => state?.chat?.users;

export default ChatSlice.reducer;
