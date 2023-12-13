import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import extraReducers from "../../hooks/UseReducers";
import axios from "axios";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : "";
const token = user?.user_auth;
// axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
console.log("token",token)
const initialState = {
  isLoading: false,
  isError: false,
  messages: null,
  users: [],
};

const url = `http://localhost:5000/api/v1/user`;

export const getAllUsersApi = createAsyncThunk(
  "auth/all_users",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get(`${url}/all_users`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      const data = await res.data;
      console.log("getAllUsersApi",data)
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
  // extraReducers
  extraReducers:(builder)=>{
    builder
    .addCase(getAllUsersApi.pending,(state,action)=>{
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(getAllUsersApi.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.isError = false;
      state.users=action?.payload?.data?.users
      // toast.success(`${action?.payload?.data?.message}`, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    })
    .addCase(getAllUsersApi.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      console.log(action?.payload)
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
  }
});

export const getAllUsers = (state) => state?.chat?.users;

export default ChatSlice.reducer;
