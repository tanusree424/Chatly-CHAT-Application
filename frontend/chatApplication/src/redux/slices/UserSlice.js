import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  otherUsers: [],
  selectedUser:null,
  socket:null,
  getOnlineUsers:null,
  searchValue: null
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
    },
    setSocket:(state, action)=>{
      state.socket = action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.getOnlineUsers= action.payload
    },
    setSearchValue:(state, action)=>{
      state.searchValue= action.payload
    }
  }
});

export const { setUserData, setOtherUsers, clearUserData, setSelectedUser , setSocket , setOnlineUsers, setSearchValue } = userSlice.actions;
export default userSlice.reducer;
