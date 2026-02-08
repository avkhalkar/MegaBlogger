import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './authSlice';

const store = configureStore({
    reducer:{
        "auth":authSliceReducer
        //TODO: add more slices here for posts
    }
});

export default store;