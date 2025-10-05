import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pic from '../Assets/pic.png';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineLogout } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../main.jsx';
import { setOtherUsers, setUserData, setSelectedUser, setSearchValue } from '../redux/slices/UserSlice.js';
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { userData, otherUsers, selectedUser, getOnlineUsers, searchValue } = useSelector((state) => state.user);
  const [searchOpen, setSearchOpen] = useState(false);
  const [SearchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OnlineUsers, setOnlineUsers] = useState([]);

  // ✅ Online users filter
  useEffect(() => {
    if (otherUsers && getOnlineUsers) {
      const list = otherUsers.filter(user => getOnlineUsers.includes(user._id));
      setOnlineUsers(list);
    }
  }, [otherUsers, getOnlineUsers]);

  // ✅ Input change
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // ✅ Logout
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

  // ✅ Handle search API call
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/api/v1/users/search?query=${SearchInput}`,
        { withCredentials: true }
      );
      dispatch(setSearchValue(response.data.userData));
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Trigger search API call when SearchInput changes
  useEffect(() => {
    if (SearchInput !== "") {
      handleSearch();
    } else {
      dispatch(setSearchValue([]));
    }
  }, [SearchInput]);

  // ✅ User list to show (search results or all users)
  const displayedUsers = SearchInput.length > 0 ? searchValue : otherUsers;

  return (
    <div className={`lg:w-[28%] ${selectedUser ? "hidden" : "sm:block"} lg:block w-full h-screen bg-slate-100 flex flex-col shadow-xl relative`}>
      
      {/* Header */}
      <div className="w-full h-[280px] px-6 py-6 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-b-[35%] shadow-md flex flex-col gap-5 relative">
        <h1 className="text-white text-3xl font-extrabold tracking-wide">Chatly</h1>

        {/* User Info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-semibold">
              Hi, {userData?.name ? userData.name : "User"}
            </h2>
            <p className="text-gray-200 text-sm">Welcome Back 👋</p>
          </div>
          <div 
            className="w-[65px] h-[65px] rounded-full overflow-hidden border-4 border-white shadow-lg"
            title={userData?.name}
          >
            <img
              src={userData?.picture ? userData.picture : pic}
              alt="Profile"
              onClick={() => navigate('/profile')}
              className="w-full h-full object-cover cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>

        {/* ✅ Search + Online Users Avatars */}
        <div className="mt-2">
          <AnimatePresence>
            {!searchOpen ? (
              <motion.div
                key="searchIcon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                {/* Search Icon */}
                <div
                  className="w-[50px] h-[50px] rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition"
                  onClick={() => setSearchOpen(true)}
                >
                  <IoIosSearch className="text-gray-700 w-6 h-6" />
                </div>

                {/* Online Users Avatars */}
                <div className="flex-1 flex gap-3 overflow-hidden py-2">
                  {Array.isArray(OnlineUsers) && OnlineUsers.length > 0 ? (
                    OnlineUsers.map((user, index) => (
                      <div key={index} className="relative group">
                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow cursor-pointer">
                          <img
                            src={user.picture ? user.picture : pic}
                            alt={user.name}
                            onClick={() => dispatch(setSelectedUser(user))}
                            className="w-full h-full object-cover hover:scale-110 transition"
                          />
                        </div>
                        {/* Hover Tooltip */}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          {user.name}
                        </span>
                        {/* Online Green Dot */}
                        <span className="absolute bottom-1 right-1 w-[14px] h-[14px] bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                    ))
                  ) : (
                    <p className="text-white text-sm">No Online Users</p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="searchBar"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex items-center bg-white px-3 py-2 shadow-lg rounded-lg overflow-hidden"
              >
                <IoIosSearch className="text-gray-600 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search Users..."
                  value={SearchInput}
                  onChange={handleInputChange}
                  className="w-full h-[40px] px-2 outline-none text-[15px] font-medium"
                />
                <button
                  type="button"
                  className="text-gray-500 px-2 hover:text-red-500"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchInput("");
                    dispatch(setSearchValue([]));
                  }}
                >
                  ✕
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ✅ User List (Filtered by Search) */}
      <div className="w-full h-[50%] overflow-auto flex flex-col items-center gap-[20px] mt-[20px]">
        {displayedUsers && displayedUsers.length > 0 ? (
          displayedUsers.map((user, index) => (
            <div
  key={index}
  className="w-[95%] h-[50px] flex justify-start items-center gap-[20px] shadow-lg border-b-2 border-gray-500 rounded-full hover:bg-slate-300 cursor-pointer relative"
  onClick={() => {
    dispatch(setSelectedUser(user));
    setSearchInput("");
  }}
>

              <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow relative flex items-center">
                <img
                  src={user.picture ? user.picture : pic}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
                {OnlineUsers.some(u => u._id === user._id) && (
                  <span className="absolute bottom-1 right-1 w-[14px] h-[14px] bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <h1 className="text-gray-800 text-xl font-semibold">
                {user.name ? user.name : user.username}
              </h1>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No Users Found</p>
        )}
      </div>

      {/* ✅ Logout Button */}
      <div className="w-full flex justify-start py-[10px] px-6 mt-auto mb-5">
        <button
          onClick={logout}
          className="w-[55px] h-[55px] flex items-center p-5 justify-center rounded-full bg-[#20c7ff] hover:bg-[#1ab4eb] text-white shadow-lg transition"
        >
          <AiOutlineLogout className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
