// redux/slices/MessageSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messageData: [], // default empty array
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessageData: (state, action) => {
      state.messageData = action.payload; // এখানে শুধু array দরকার
    },
  },
});

export const { setMessageData } = messageSlice.actions; // messageData এক্সপোর্ট করতে হবে না
export default messageSlice.reducer;

