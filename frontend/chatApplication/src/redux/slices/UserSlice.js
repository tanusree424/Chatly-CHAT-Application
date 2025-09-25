import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  otherUsers: [],
  selectedUser:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.otherUsers = [];
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    }
  }
});

export const { setUserData, setOtherUsers, clearUserData, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
