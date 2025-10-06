import axios from 'axios';

import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/slices/UserSlice.js';
import { serverURL } from '../main.jsx';
import useSocket from '../CustomHooks/UserSocket.jsx';



const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userData, getOnlineUsers, socket }= useSelector((state) => state.user);
  console.log(getOnlineUsers);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // ১. Login API call
    const response = await axios.post(
      `${serverURL}/api/v1/auth/login`,
      formData,
      { withCredentials: true }
    );

    // ২. Redux এ login user store করা
    dispatch(setUserData(response.data.user));
    console.log(response.data.user);
   

    // ৩. Login successful হলে Other Users fetch করা
    const usersRes = await axios.get(`${serverURL}/api/v1/all-users`, { withCredentials: true });
    console.log(usersRes.data.users);
    dispatch(setOtherUsers(usersRes.data.users));
     useSocket(userData?._id);

    setLoading(false);

    // ৪. Home বা Dashboard এ navigate করা
    navigate("/");

  } catch (error) {
    console.log(error.message);
    setLoading(false);
    setError(error.response?.data?.message || "Something went wrong");
  }
};


  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex items-center justify-center">
          <h1 className="text-white font-bold text-3xl text-center">
            Welcome to <span className="text-white">Chatly</span>
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 mt-8">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-[90%] h-[50px] px-[20px] border-2 border-[#20c7ff] rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#20c7ff]"
            required
          />

          <div className="w-[90%] relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full h-[50px] px-[20px] border-2 border-[#20c7ff] rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#20c7ff]"
              required
            />
            <span
              onClick={toggleShowPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-xl"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
         

          <button
            type="submit"
            className="w-[90%] h-[50px] bg-[#20c7ff] text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
          disabled={Loading}
          >
            {Loading ? "Loading..." : "Login"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-sm">
            Don't have an account?{" "}
            <span onClick={goToSignup} className="text-[#20c7ff] font-semibold cursor-pointer">
             SignUp
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
