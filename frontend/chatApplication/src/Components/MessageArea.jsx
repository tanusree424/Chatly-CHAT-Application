// MessageArea.jsx
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import pic from "../assets/pic.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/slices/UserSlice.js";
import { FaImages } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";

const MessageArea = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  // Small device এ: যদি user select না থাকে → message area hide
  if (!selectedUser) {
    return (
      <div className="hidden lg:flex w-full h-full bg-slate-100 border border-gray-300 rounded-md">
        <div className="flex flex-col items-center justify-center w-full h-full text-center p-6">
          <h1 className="text-gray-700 font-bold text-3xl md:text-5xl mb-4">
            Welcome to Chatly
          </h1>
          <span className="text-gray-600 font-semibold text-lg md:text-2xl mb-2">
            Chat Friendly
          </span>
          <p className="text-gray-500 text-sm md:text-base">
            Select a user to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-slate-100 border border-gray-300 rounded-md relative">
      {/* Header */}
      <div className="w-full px-4 py-4 bg-[#127799] rounded-b-2xl shadow-md flex items-center gap-4">
        <div onClick={() => dispatch(setSelectedUser(null))}>
          <IoIosArrowRoundBack
            className="w-10 h-10 text-gray-200 cursor-pointer hover:text-gray-900 transition"
            title="Go Back"
          />
        </div>
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={selectedUser?.picture || pic}
            alt="Profile"
            className="w-full h-full object-cover cursor-pointer hover:scale-110 transition"
          />
        </div>
        <h1 className="text-white text-lg md:text-xl font-semibold truncate">
          {selectedUser?.name || selectedUser?.username || "User"}
        </h1>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div className="flex justify-start">
          <div className="max-w-[75%] bg-white text-gray-800 px-4 py-2 rounded-2xl shadow">
            Hey 👋, how are you?
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[75%] bg-[#127799] text-white px-4 py-2 rounded-2xl shadow">
            I'm good! What about you?
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[75%] bg-white text-gray-800 px-4 py-2 rounded-2xl shadow">
            I'm doing great too. Let's catch up!
          </div>
        </div>
      </div>

      {/* Chat Input Box */}
      <div className="w-full px-4 py-3 bg-white border-t border-gray-300">
        <form className="flex items-center gap-3 w-full bg-gray-100 rounded-full px-4 py-2 shadow-md">
          {/* Left Icons */}
          <div className="flex items-center gap-3 text-gray-500">
            <FaImages className="cursor-pointer hover:text-[#127799] transition text-xl" />
            <MdEmojiEmotions className="cursor-pointer hover:text-[#127799] transition text-xl" />
          </div>

          {/* Input Box */}
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-gray-700 px-2 text-sm md:text-base"
            placeholder="Type a message..."
          />

          {/* Send Button */}
          <button
            type="submit"
            className="flex items-center justify-center bg-[#127799] text-white p-3 rounded-full hover:bg-[#0f5f77] transition"
          >
            <IoSendSharp className="text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageArea;
