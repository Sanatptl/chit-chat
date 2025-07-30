import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: ["http://localhost:5173"] } });

//used to store online user
const userSocketMap = {}; //{userID:socketID}

io.on("connection", (socket) => {
  console.log("A user connected ", socket.id);

  const userID = socket.handshake.query?.userID;
  if (userID) {
    userSocketMap[userID] = socket.id;
  }

  //io.emit is used to send events to all connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected ", socket.id);
    delete userSocketMap[userID];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export function getReceiverSocketId(userID) {
  return userSocketMap[userID];
}

export { io, app, server };
