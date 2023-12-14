import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";

const Socket = io.connect("http://localhost:5000");
const initialState = {
  isLoading: false,
  isError: false,
  messages: null,
  socket:null
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    socketConnect:(state,action)=>{
      state.socket=Socket;
    }
  },
});

export const { socketConnect } = MessageSlice.actions;
export const messages=(state)=>state?.message?.messages;
export const useSocket=(state)=>state?.message?.socket;
export default MessageSlice.reducer;
