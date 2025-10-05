import React from "react";
import { useSelector } from "react-redux";
import dp from "../assets/pic.png"
import {useNavigate} from "react-router-dom";
import UserProfile from "../pages/UserProfile"; 
const ReceiverMessage = ({ message, image }) => {
  const {selectedUser} = useSelector((state)=>state.user);
    const navigate = useNavigate();
  return (
    <div className="flex  items-start gap-3 mt-3">
      {/* Message Bubble */}
       {/* Sender Avatar */}
      <img
        src={selectedUser?.picture ? selectedUser.picture : dp}
        alt="Sender"
        onClick={(e)=>navigate("/user/profile")}
        className="w-10 h-10 shadow-lg shadow-gray-400 rounded-full cursor-pointer object-cover border"
      />
      <div className="max-w-[70%] shadow-lg shadow-gray-400 bg-green-500 text-white px-4 py-2 rounded-2xl rounded-tl-none shadow-md flex flex-col gap-2">
        {image && (
          <img
            src={image}
            alt="sent"

            className="rounded-lg max-h-[300px] shadow-lg shadow-gray-400  max-w-[300px] object-contain"
          />
        )}
        {message && <span className="break-words">{message}</span>}
      </div>

     
    </div>
  );
};

export default ReceiverMessage;
