// Home.jsx
import React from 'react';
import Sidebar from '../Components/Sidebar';
import { useSelector } from 'react-redux';
import MessageArea from '../Components/MessageArea';

const Home = () => {
  const { selectedUser } = useSelector((state) => state.user); // note: state.user, না state.selectedUser
  console.log(selectedUser);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        {selectedUser ? (
          // যদি user select করা থাকে, MessageArea দেখাবে
          <MessageArea />
        ) : (
          // যদি কোন user select না থাকে, welcome screen দেখাবে
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-700">
              Welcome to Chatly 👋
            </h1>
            <p className="text-gray-500 mt-2">
              Select a user to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
