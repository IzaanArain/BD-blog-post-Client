import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { SocketService } from "../../utils/SocketService";
const Socket=SocketService()

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
      console.log("socketConnect",Socket)
      state.socket = Socket;  
    },
    emitMesseges:(state,action)=>{
      Socket.emit("get_all_messages",action.payload)
    },
  }
});

export const { socketConnect,emitMesseges } = MessageSlice.actions;
export const useSocket = (state) => state?.message?.socket;
export default MessageSlice.reducer;
