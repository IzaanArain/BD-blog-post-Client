import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
const initialState = {
  isLoading: false,
  isError: false,
  messages: null,
  Socket:null
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    socketConnect:(state,action)=>{
      state.Socket=socket;
    }
  },
});

export const { socketConnect } = MessageSlice.actions;
export const messages=(state)=>state?.message?.messages;
export const useSocket=(state)=>state?.message?.Socket;
export default MessageSlice.reducer;
