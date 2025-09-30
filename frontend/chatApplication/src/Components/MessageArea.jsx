import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import pic from "../assets/pic.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/slices/UserSlice.js";
import { FaImages } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { setMessageData } from "../redux/slices/MessageSlice.js";
import axios from "axios";
import { serverURL } from "../main.jsx";
import SenderMessage from "./SenderMessage.jsx";
import ReceiverMessage from "./ReceiverMessage.jsx";
import useSocket from "../CustomHooks/UserSocket.jsx";

const MessageArea = () => {
  const dispatch = useDispatch();
  const { selectedUser, userData } = useSelector((state) => state.user);
  const { messageData } = useSelector((state) => state.message);

  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);

  // Socket listener
  // const socket = useSocket(userData?._id, ({ senderId, message }) => {
  //   // Only add message if it's from the currently selected user
  //   if (selectedUser && senderId === selectedUser._id) {
  //     dispatch(setMessageData([...messageData, { sender: senderId, message }]));
  //   }
  // });
const socket = useSocket(userData?._id, ({ senderId, message }) => {
  console.log("📩 New message received:", { senderId, message }); // <-- console log added

  // Only add message if it's from the currently selected user
  if (selectedUser && senderId === selectedUser._id) {
    dispatch(setMessageData([...messageData, { sender: senderId, message }]));
  }
});
  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/api/v1/messages/${selectedUser._id}`,
          { withCredentials: true }
        );
        dispatch(setMessageData(response.data.messages));
      } catch (error) {
        console.log("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedImage) return;

    const formData = new FormData();
    formData.append("message", newMessage);
    if (selectedImage) formData.append("image", selectedImage);

    try {
      // Send message via API
      const response = await axios.post(
        `${serverURL}/api/v1/messages/send/${selectedUser._id}`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );

      // Emit socket message to receiver
      if (socket && selectedUser) {
        socket.emit("sendMessage", {
          receiverId: selectedUser._id,
          message: newMessage,
        });
      }

      // Add sent message locally
      dispatch(setMessageData([...messageData, response.data.newMessage]));
      setNewMessage("");
      setSelectedImage(null);
    } catch (error) {
      console.log("Error sending message:", error.message);
    }
  };

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
          <IoIosArrowRoundBack className="w-10 h-10 text-gray-200 cursor-pointer hover:text-gray-900 transition" />
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
        {messageData && messageData.length > 0  ? (
          messageData.map((msg) => (
            <div key={msg._id || Math.random()}>
              {msg.sender === userData._id ? (
                <SenderMessage message={msg.message} image={msg.image} />
              ) : (
                <ReceiverMessage message={msg.message} image={msg.image} />
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center text-gray-500 mt-20">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="w-full px-4 py-3 bg-white border-t border-gray-300">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-3 w-full bg-gray-100 rounded-full px-4 py-2 shadow-md"
        >
          <label>
            <FaImages className="cursor-pointer hover:text-[#127799] transition text-xl" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </label>
          <MdEmojiEmotions className="cursor-pointer hover:text-[#127799] transition text-xl" />
          <input
            type="text"
            name="message"
            className="flex-1 bg-transparent outline-none text-gray-700 px-2 text-sm md:text-base"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
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
