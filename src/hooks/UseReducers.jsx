// import { createSlice } from "@reduxjs/toolkit";
import { signUpApi, loginApi, OtpVerifyApi,ForgotPasswordApi,resetPasswordApi,completeProfileApi } from "../features/Auth/Auth";
import { getAllUsersApi } from "../features/Chat/ChatSlice";
import { toast } from "react-toastify";
import axios from "axios";

const extraReducers = (builder) => {
  builder
    .addCase(signUpApi.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(signUpApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user=action?.payload?.data
      toast.success(`${action?.payload?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .addCase(signUpApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // console.error("Rejected Error",action?.payload?.message);
      // console.error("Rejected Error",action?.error?.message);
      state.user=action?.payload?.message;
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })

    .addCase(loginApi.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(loginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      localStorage.setItem("user",JSON.stringify(action?.payload?.data?.user))
      axios.defaults.headers.common['Authorization']=`Bearer ${action?.payload?.data?.user?.user_auth}`
      state.user = action?.payload?.data?.user;
      toast.success(`${action?.payload?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .addCase(loginApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // console.error("Rejected Error",action?.payload?.message);
      // console.error("Rejected Error",action?.error?.message);
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })

    .addCase(OtpVerifyApi.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(OtpVerifyApi.fulfilled, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.user=action?.payload?.data
      toast.success(`${action?.payload?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .addCase(OtpVerifyApi.rejected, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })

    .addCase(ForgotPasswordApi.pending,(state,action)=>{
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(ForgotPasswordApi.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.isError = false;
    })
    .addCase(ForgotPasswordApi.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = false;
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })

    .addCase(resetPasswordApi.pending,(state,action)=>{
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(resetPasswordApi.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.isError = false;
      toast.success(`${action?.payload?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .addCase(resetPasswordApi.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = false;
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })

    .addCase(completeProfileApi.pending,(state,action)=>{
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(completeProfileApi.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.isError = false;
      state.user=action?.payload?.data?.user;
      toast.success(`${action?.payload?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .addCase(completeProfileApi.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })

    // .addCase(getAllUsersApi.pending,(state,action)=>{
    //   state.isLoading = true;
    //   state.isError = false;
    // })
    // .addCase(getAllUsersApi.fulfilled,(state,action)=>{
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.users=action?.payload?.data?.users
    //   toast.success(`${action?.payload?.data?.message}`, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // })
    // .addCase(getAllUsersApi.rejected,(state,action)=>{
    //   state.isLoading = false;
    //   state.isError = true;
    //   toast.error(`${action?.payload?.message}`, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // })
};

export default extraReducers;
