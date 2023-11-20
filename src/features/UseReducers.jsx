import { signUpApi, loginApi, OtpVerifyApi,ForgotPasswordApi,resetPasswordApi,completeProfileApi } from "./Auth/Auth";
import { toast } from "react-toastify";

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
      state.isLoading = true;
      state.isError = false;
      state.user=action?.payload?.data?.user;
      toast.success(`${action?.payload?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .addCase(completeProfileApi.rejected,(state,action)=>{
      state.isLoading = true;
      state.isError = false;
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
};

export default extraReducers;
