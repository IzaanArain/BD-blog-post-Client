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
     if(Socket){
      state.socket = Socket;
     }else{
      toast.error(`connection failed`, {
        position: toast.POSITION.TOP_RIGHT,
      });
     }
    },
    emitMesseges: (state, action) => {
      Socket.emit("get_all_messages", action.payload);
    },
    emitSendMessage: (state, action) => {
      Socket.emit("send_message", action.payload);
    },
    disconnectSocket: (state, action) => {
      Socket.on("disconnect");
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      console.log("addMessage",action?.payload)
      state.messages.push(action?.payload);
    },
  },
});

export const {
  socketConnect,
  emitMesseges,
  disconnectSocket,
  emitSendMessage,
  setMessages,
  addMessage,
} = MessageSlice.actions;
export const useSocket = (state) => state?.message?.socket;
export const useMessage = (state) => state?.message?.messages;
export default MessageSlice.reducer;
