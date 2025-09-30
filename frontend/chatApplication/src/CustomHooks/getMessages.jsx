import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessageData } from "../redux/slices/MessageSlice.js";
import { serverURL } from "../main.jsx";

const useMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/api/v1/messages/${selectedUser._id}`,
          { withCredentials: true }
        );

        const messages = JSON.parse(JSON.stringify(response.data.messages));

        // শুধু array পাঠাচ্ছি
        dispatch(setMessageData(messages));
      } catch (error) {
        console.log("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, [dispatch, selectedUser]);
};

export default useMessages;
