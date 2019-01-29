const express = require("express");
const server = express();
const static = express.static;
const socket = require("socket.io");

server.use(static("public"));

server.get("/hello", (req, res) => {
  res.send("hello word");
});

const result = server.listen(8000, () => {
  console.log("=>server running on  8000");
});
const io = socket(result);

io.on("connection", socket => {
  console.log("this is a connection", socket.id);

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
