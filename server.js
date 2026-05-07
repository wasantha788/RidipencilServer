import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import artRouter from "./routes/art.js";
import messageRouter from "./routes/messageRoute.js";

const app = express();

const allowedOrigins = [

  "https://ridipencil.vercel.app"
];

// Connect Services
await connectDB();
await connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Working Successfully ✅",
  });
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/art", artRouter);
app.use("/api/message", messageRouter);

// Export app for Vercel
export default app;