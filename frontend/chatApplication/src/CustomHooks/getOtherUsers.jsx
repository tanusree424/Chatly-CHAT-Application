import { setOtherUsers } from "../redux/slices/UserSlice";
import axios from "axios";
import { serverURL } from "../main.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const getOtherUsers = async () => {
    const dispatch = useDispatch();
    const { otherUsers } = useSelector((state) => state.user);
    useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/users/all-users`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(response.data.users));
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);

  return otherUsers;

}


export default getOtherUsers;
