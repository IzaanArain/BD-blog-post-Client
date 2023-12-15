import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
const Socket = io.connect(import.meta.env.VITE_API_URL);
const initialState = {
  isLoading: false,
  isError: false,
  messages: [],
  socket: null,
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    socketConnect: (state, action) => {
      state.socket = Socket;
    },
    emitMesseges: (state, action) => {
      Socket.emit("get_all_messages", action.payload);
    },
    emitSendMessage:(state,action)=>{
      Socket.emit("send_message",action.payload)
    },
    disconnectSocket: (state, action) => {
      Socket.on("disconnect");
    },
  },
});

export const { socketConnect, emitMesseges, disconnectSocket,emitSendMessage } =
  MessageSlice.actions;
export const useSocket = (state) => state?.message?.socket;
export default MessageSlice.reducer;
