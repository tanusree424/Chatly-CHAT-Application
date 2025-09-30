import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/UserSlice.js"
import messageReducer from "./slices/MessageSlice.js";
export const store = configureStore({
 reducer:{
    user:userReducer,
    message:messageReducer
 }
});