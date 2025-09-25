import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/slices/UserSlice";
import { serverURL } from "../main.jsx";


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch =  useDispatch();
  const userData = useSelector((state) => state.user);
 // console.log(userData);
  const [error, setError] = useState("");
    const [Loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
   axios.post(`${serverURL}/api/v1/auth/signup`, formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})
.then((response) => {
    console.log(response.data);
    dispatch(setUserData(response.data.user));
    navigate("/login");
})
.catch((error) => {
    console.log(error.response?.data?.message);
    setError(error.response?.data?.message || "Something went wrong");
})
.finally(() => {
    setLoading(false);
});

    console.log(formData); // এখানে API call করতে পারো
  };

  const goToLogin = () => {
    navigate("/login");
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
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-4 mt-8"
        >
          {/* Username */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-[90%] h-[50px] px-[20px] border-2 border-[#20c7ff] rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#20c7ff]"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-[90%] h-[50px] px-[20px] border-2 border-[#20c7ff] rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#20c7ff]"
            required
          />

        {/* Password with Eye Icon */}
          <div className="w-[90%] relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full h-[60px] px-[20px] border-2 border-[#20c7ff] rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-[#20c7ff]"
              required
            />
            <span
              onClick={toggleShowPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-xl"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-[90%] h-[50px] bg-[#20c7ff] text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
          disabled={Loading}
          >
           {Loading ? "Loading..." : "Signup"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {/* Login Link */}
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={goToLogin}
              className="text-[#20c7ff] font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
