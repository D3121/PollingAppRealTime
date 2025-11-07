// import express from "express";
// import http from "http";
// import cors from "cors";
// import dotenv from "dotenv";
// import { initIO } from "./socket.js";
// import pollRoutes from "./routes/pollRoutes.js";

// dotenv.config();

// const app = express();

// // ✅ Cấu hình CORS cho Netlify
// app.use(
//   cors({
//     origin: [
//       "https://pollingapprealtimefrontend.netlify.app", // ✅ correct frontend domain
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// // ✅ Middleware cơ bản
// app.use(express.json());
// app.use("/api/polls", pollRoutes);

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("✅ Server is running and CORS is enabled!");
// });

// // ✅ Khởi tạo server HTTP + Socket.IO
// const server = http.createServer(app);

// // ✅ Socket.IO với CORS
// initIO(server, {
//   cors: {
//     origin: [
//       "https://pollingapprealtimefrontend.netlify.app", // ✅ same here
//     ],
//     methods: ["GET", "POST"],
//   },
// });


// // ✅ PORT
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });


import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { initIO } from "./socket.js";
import pollRoutes from "./routes/pollRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "https://pollingapprealtimefrontend.netlify.app",
      "http://localhost:5173" // optional for local testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware & routes
app.use(express.json());
app.use("/api/polls", pollRoutes);
app.get("/", (req, res) => {
  res.send("✅ Server is running and CORS is enabled!");
});
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

// ✅ Socket.IO setup
initIO(server, {
  cors: {
    origin: [
      "https://pollingapprealtimefrontend.netlify.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
  },
});

// ✅ Connect to MongoDB first
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in environment variables");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("✅ MongoDB connected");
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
})
.catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});

