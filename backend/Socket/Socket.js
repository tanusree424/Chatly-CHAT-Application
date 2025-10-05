import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: [
      "https://chatly-chat-application-4iw5.onrender.com",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});


// Online users: { userId: socketId }
 const onlineUsers = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  onlineUsers[userId] = socket.id;
  console.log(`✅ User connected: ${userId}, socketId: ${socket.id}`);

  // Emit current online users
  io.emit("getOnlineUsers", Object.keys(onlineUsers));



  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    console.log(`❌ User disconnected: ${userId}`);
  });
});

export { app, server, io, onlineUsers  };
