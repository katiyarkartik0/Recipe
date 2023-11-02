import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import toastSlice from "./slices/toast";


const store = configureStore({
    reducer:{
        auth:authSlice,
        toast:toastSlice
    }
})

export default store;