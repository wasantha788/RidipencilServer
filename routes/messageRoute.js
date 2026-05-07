import express from "express";

import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

/* ======================================================
   ROUTES
====================================================== */

// Send Message
router.post("/send", sendMessage);

// Get All Messages
router.get("/list", getMessages);

// Delete Message
router.delete("/delete/:id", deleteMessage);

export default router;