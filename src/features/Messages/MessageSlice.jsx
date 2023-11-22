import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isError: false,
  messages: null,
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
});

export const { socketConnect } = MessageSlice.actions;

export default MessageSlice.reducer;
