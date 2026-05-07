import express from "express";
import { upload } from "../configs/multer.js";

import {
  addArt,
  getArts,
  getSingleArt,
  updateArt,
  deleteArt,
  likeArt,
} from "../controllers/artController.js";

const router = express.Router();

/* ======================================================
   ART ROUTES
====================================================== */

// ➤ Create new art (with image upload)
router.post("/add", upload.array("images"), addArt);

// ➤ Get all arts
router.get("/list", getArts);

// ➤ Get single art by ID
router.get("/:id", getSingleArt);

// ➤ Update art
router.put("/update/:id", updateArt);

// ➤ Delete art
router.delete("/delete/:id", deleteArt);

// ➤ Like art
router.put("/like/:id", likeArt);

export default router;