import { signUpApi, loginApi, OtpVerifyApi } from "./Auth/Auth";
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
      toast.success(`user created succesfully`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .addCase(signUpApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // console.error("Rejected Error",action?.payload?.message);
      // console.error("Rejected Error",action?.error?.message);
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
    })
    .addCase(OtpVerifyApi.rejected, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      toast.error(`${action?.payload?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
};

export default extraReducers;
