// import { Server } from "socket.io";

// let io;

// export const initIO = (server, options = {}) => {
//   io = new Server(server, options);

//   io.on("connection", (socket) => {
//     console.log("🟢 New client connected:", socket.id);

//     socket.on("disconnect", () => {
//       console.log("🔴 Client disconnected:", socket.id);
//     });
//   });

//   return io;
// };

// export const getIO = () => {
//   if (!io) throw new Error("Socket.io not initialized!");
//   return io;
// };


// socket.js

import { Server } from "socket.io";

let io;

export const initIO = (server, options = {}) => {
  io = new Server(server, {
    cors: {
      origin: [
        "https://pollingapprealtimefrontend.netlify.app", // ✅ frontend domain
        "http://localhost:5173" // ✅ optional for local testing
      ],
      methods: ["GET", "POST"],
      credentials: true,
      ...options.cors // allow overrides from server.js
    }
  });

  io.on("connection", (socket) => {
    console.log("✅ New socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
