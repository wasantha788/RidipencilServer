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
const port = process.env.PORT || 4000;


const allowedOrigins = ["http://localhost:5173"];

(async () => {
  try {
    await connectDB();
    await connectCloudinary();


  // Middlewares
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: allowedOrigins, credentials: true }));

/* ROUTES */
app.get("/", (req, res) => res.send("API is Working ✅"));

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/art", artRouter);
app.use("/api/message", messageRouter);

/* ERROR HANDLER */
app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
})();
