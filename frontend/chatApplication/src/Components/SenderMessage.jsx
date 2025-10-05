import React from "react";
import { useSelector } from "react-redux";
import dp from "../assets/pic.png";
import {useNavigate} from "react-router-dom";

const SenderMessage = ({ message, image }) => {
  const { userData } = useSelector((state) => state.user);
  // console.log(userData);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-end gap-1 mt-3">
      {/* Message Bubble */}
      <div className="max-w-[70%] bg-blue-500 shadow-lg shadow-gray-400 text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-md flex flex-col gap-2">
        {image && (
          <img
            src={image}
            alt="sent"
           
            className="rounded-lg max-h-[300px] max-w-[300px] object-contain"
          />
        )}
        {message && <span className="break-words">{message}</span>}
      </div>

      {/* Sender Avatar */}
      <img
        src={userData?.picture ? userData.picture : dp}
        alt="Sender"
         onClick={(e)=> navigate("/profile")  }
        className="w-4 h-5 rounded-full object-cover cursor-pointer  border"
      />
    </div>
  );
};

export default SenderMessage;
