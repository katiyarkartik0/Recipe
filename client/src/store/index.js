import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import toastSlice from "./slices/toast";
import recipesSlice from "./slices/recipes";


const store = configureStore({
    reducer:{
        auth:authSlice,
        toast:toastSlice,
        recipes:recipesSlice
    }
})

export default store;