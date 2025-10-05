import React from 'react'
import Sidebar from "../Components/Sidebar.jsx";
import {useSelector} from "react-redux";
const UserProfile = () => {
    const {selectedUser} =  useSelector((state)=>state.user);
   // console.log(selectedUser);
  return (
   <>
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
      
      </div>
      </div>
   </>
  )
}

export default UserProfile