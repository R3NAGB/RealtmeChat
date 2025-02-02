const socket = io();

// Ask for username
let username;
do {
    username = prompt("Enter your username:");
} while (!username);

socket.emit("join", username);

// Send message
document.getElementById("send-btn").addEventListener("click", () => {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message) {
        socket.emit("message", message);
        messageInput.value = "";
    }
});

// Receive and display messages
socket.on("message", (data) => {
    const messagesDiv = document.getElementById("messages");
    const newMessage = document.createElement("div");
    
    newMessage.classList.add("message");
    if (data.user === username) {
        newMessage.classList.add("sent"); // Sent messages style
        newMessage.innerHTML = `<strong>You:</strong> ${data.text}`;
    } else {
        newMessage.classList.add("received"); // Received messages style
        newMessage.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
    }

    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
