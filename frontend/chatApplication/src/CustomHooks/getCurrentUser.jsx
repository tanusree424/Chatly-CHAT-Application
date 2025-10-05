import { serverURL } from '../main.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { setUserData } from '../redux/slices/UserSlice.js';
export const getCurrentUser = async () => {
    const dispatch = useDispatch();
    const {userData} = useSelector((state) => state.user);
  //  console.log(userData);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/users/current-user`, {
          withCredentials: true,
        });
        dispatch(setUserData(response.data.user));
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (!userData) fetchUser();
  }, [dispatch, userData]);

  return userData;
};
