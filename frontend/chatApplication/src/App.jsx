import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Singup'   // Typo ঠিক করলাম
import './index.css'
import { getCurrentUser } from './CustomHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { toast ,  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getOtherUsers from './CustomHooks/getOtherUsers';
import useSocket from './CustomHooks/UserSocket'
import  UserProfile from "./pages/UserProfile";

const App = () => {
  // custom hook call
  getCurrentUser();
  getOtherUsers();

  // redux থেকে user data আনো
  const { userData , selectedUser } = useSelector((state) => state.user);
  const { otherUsers , socket , } = useSelector((state) => state.user);
 // console.log(userData);
 // console.log(otherUsers);
//useSocket(userData._id);
 //console.log(socket);
 useSocket(userData?._id);
  return (
    <div>
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
 
    <Routes>
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to="/profile" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/signup" />}
      />
        <Route
        path="/user/profile"
        element={selectedUser ? <UserProfile /> : <Navigate to="/" />}
      />
    </Routes>
       </div>
  )
}

export default App
