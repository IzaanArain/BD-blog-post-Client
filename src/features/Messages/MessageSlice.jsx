import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_APP_URL);
const initialState = {
  isLoading: false,
  isError: false,
  messages: null,
};

// const getallMessagesSocket = createAsyncThunk(
//   "auth/get_messages",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await socket.emit("get_all_messages", {
//         sender_id: payload.sender_id,
//         receiver_id: payload.receiver_id,
//       });
//       return {data}
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    // .addCase()
  },
});

export default MessageSlice.reducer;
