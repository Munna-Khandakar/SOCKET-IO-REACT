/*
 * Title: SOCKET.IO demonstration using react, node and express
 * Description: A simple app where real time event based chat application
 * Author: Munna Khandakar (learnt from 'PedroTech')
 * Date: 25 Apr 2022
 *
 */

// dependencies
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server, Socket } = require("socket.io");

// initialize the main app
const app = express();

// using cors middleware to support secure cross-origin requests and data transfers between browsers and servers.
app.use(cors());

// by documentation, it is better to create the server using http.createServer for socket
const server = http.createServer(app);

// create the socket io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// listening to an event
io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  // listening to join_room event
  socket.on("join_room", (data) => {
    // joining room
    socket.join(data);
  });
  // listening to send_message event
  socket.on("send_message", (data) => {
    // sending to a particular user
    socket.to(data.room).emit("receive_message", data);
  });
});

// listening to server
server.listen(5000, () => {
  console.log("SERVER IS RUNNING");
});
