import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pic from '../Assets/pic.png';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineLogout } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../main.jsx';
import { setOtherUsers, setUserData, setSelectedUser } from '../redux/slices/UserSlice.js';

const Sidebar = () => {
  const { userData, otherUsers, selectedUser } = useSelector((state) => state.user);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Logout function
  const logout = async () => {
    try {
      const response = await axios.post(`${serverURL}/api/v1/auth/logout`, {}, {
        withCredentials: true
      });
      console.log("Logout response:", response);
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  
    {

 
  return (
    <>
    <div className={`lg:w-[28%] ${selectedUser ? "hidden" : "sm:block"}  lg:block w-full h-screen bg-slate-100 flex flex-col shadow-xl relative`}>
      {/* Header */}
      <div className="w-full h-[280px] px-6 py-6 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-b-[35%] shadow-md flex flex-col gap-5">
        <h1 className="text-white text-3xl font-extrabold tracking-wide">Chatly</h1>
        {/* User Info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-semibold">
              Hi, {userData?.name ? userData.name : "User"}
            </h2>
            <p className="text-gray-200 text-sm">Welcome Back 👋</p>
          </div>
          <div className="w-[65px] h-[65px] rounded-full overflow-hidden border-4 border-white shadow-lg" title={userData?.name}>
            <img
              src={userData?.picture ? userData.picture : pic}
              alt="Profile"
              onClick={() => navigate('/profile')}
              className="w-full h-full object-cover cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>

        {/* Search + User List */}
        <div className="mt-2">
          {!searchOpen ? (
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <div
                className="w-[50px] h-[50px] rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition"
                onClick={() => setSearchOpen(true)}
              >
                <IoIosSearch className="text-gray-700 w-6 h-6" />
              </div>

              {/* User List */}
              <div className="flex-1 flex gap-3 overflow-hidden py-2">
                {otherUsers && otherUsers.length > 0 ? (
                  otherUsers.map((user, index) => (
                    <div key={index} className="relative group">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow cursor-pointer">
                        <img
                          src={user.picture ? user.picture : pic}
                          alt={user.name}
                          className="w-full h-full object-cover hover:scale-110 transition"
                        />
                      </div>
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        {user.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-white text-sm">No Users</p>
                )}
              </div>
            </div>
          ) : (
            /* Search Bar */
            <form className="w-full flex items-center bg-white px-3 py-2 shadow-lg rounded-lg overflow-hidden">
              <IoIosSearch className="text-gray-600 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search Users..."
                className="w-full h-[40px] px-2 outline-none text-[15px] font-medium"
              />
              <button
                type="button"
                className="text-gray-500 px-2 hover:text-red-500"
                onClick={() => setSearchOpen(false)}
              >
                ✕
              </button>
            </form>
          )}
        </div>
      </div>

      {/* User List (Bottom Scrollable) */}
{/* User List (Scrollable) */}
  <div
    className="flex-1 w-full flex flex-col items-center gap-[20px] mt-[20px] 
               overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 px-2"
  >
    {otherUsers && otherUsers.length > 0 ? (
      otherUsers.map((user, index) => (
        <div
          key={index}
          className="w-[95%] h-[60px] flex justify-start items-center gap-[20px] shadow-lg rounded-full hover:bg-slate-300 cursor-pointer"
          onClick={() => dispatch(setSelectedUser(user))}
        >
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center shadow">
            <img
              src={user.picture ? user.picture : pic}
              alt={user.name}
              className="w-full h-full object-cover"
              title={user.name}
            />
          </div>
          <h1 className="text-gray-800 text-xl font-semibold">
            {user.name ? user.name : user.username}
          </h1>
        </div>
      ))
    ) : (
      <p className="text-gray-600 text-sm">No Users</p>
    )}
  </div>



      {/* Logout Button */}
      <div className="fixed bottom-5 left-5">
        <button
          onClick={logout}
          className="w-[55px] h-[55px] flex items-center justify-center rounded-full bg-[#20c7ff] hover:bg-[#1ab4eb] text-white shadow-lg transition"
        >
          <AiOutlineLogout className="w-6 h-6" />
        </button>
      </div>

    </div>
    </>
  )} 
  
}

export default Sidebar;
