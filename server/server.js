const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("../public")); // Serve frontend files

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle user joining with a username
    socket.on("join", (username) => {
        socket.username = username;
        io.emit("message", { user: "Server", text: `${username} joined the chat` });
    });

    // Handle messages
    socket.on("message", (data) => {
        io.emit("message", { user: socket.username, text: data });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.username || socket.id);
        io.emit("message", { user: "Server", text: `${socket.username} left the chat` });
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
