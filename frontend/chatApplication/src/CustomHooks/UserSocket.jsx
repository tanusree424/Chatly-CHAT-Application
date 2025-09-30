// useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../redux/slices/UserSlice.js";
import { setMessageData } from "../redux/slices/MessageSlice.js"; 
import { serverURL } from "../main.jsx";

const useSocket = (userId) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const { messageData } = useSelector((state) => state.message);

  useEffect(() => {
    if (!userId || !userData?._id) return;

    const newSocket = io(serverURL, {
      withCredentials: true,
      query: { userId: userData._id },
    });

    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    // যখন message আসবে backend থেকে
    newSocket.on("receiveMessage", ({ senderId, receiverId, message, image }) => {
      console.log("📩 Socket receiveMessage:", senderId, message);

      // redux state update → পুরোনো messages এর সাথে নতুন message যোগ
      dispatch(
        setMessageData([
          ...messageData,
          { sender: senderId, receiver: receiverId, message, image },
        ])
      );
    });

    newSocket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, userData?._id, messageData, dispatch]);

  return socketRef.current;
};

export default useSocket;
