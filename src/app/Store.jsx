import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/Auth"

export const store=configureStore({
   reducer:{
    auth:AuthReducer
   }
});