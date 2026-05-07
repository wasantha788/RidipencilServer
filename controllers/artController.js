import Art from "../models/Art.js";
import { v2 as cloudinary } from "cloudinary";

/* ======================================================
   ADD ART (CLOUDINARY FIXED)
====================================================== */
export const addArt = async (req, res) => {
  try {
    // FIX: correct key from frontend
    const artData = JSON.parse(req.body.artData || "{}");

    const files = req.files || [];

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // VALIDATION
    if (!artData.name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (imageUrls.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // CREATE ART (FIXED)
    const newArt = await Art.create({
      name: artData.name,
      description: artData.description || [],
      image: imageUrls,
      videos: artData.videos || [],
    });

    res.status(201).json({
      success: true,
      message: "Art added successfully 🎨",
      art: newArt,
    });
  } catch (error) {
    console.log("ADD ART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   GET ALL ART
====================================================== */
export const getArts = async (req, res) => {
  try {
    const arts = await Art.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      arts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   GET SINGLE ART
====================================================== */
export const getSingleArt = async (req, res) => {
  try {
    const art = await Art.findById(req.params.id);

    if (!art) {
      return res.status(404).json({
        success: false,
        message: "Art not found",
      });
    }

    res.json({
      success: true,
      art,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   UPDATE ART
====================================================== */
export const updateArt = async (req, res) => {
  try {
    const { name, description, videos } = req.body;

    const updatedArt = await Art.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        videos,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Art updated successfully",
      art: updatedArt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   DELETE ART
====================================================== */
export const deleteArt = async (req, res) => {
  try {
    await Art.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Art deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   LIKE ART
====================================================== */
export const likeArt = async (req, res) => {
  try {
    const art = await Art.findById(req.params.id);

    if (!art) {
      return res.status(404).json({
        success: false,
        message: "Art not found",
      });
    }

    art.likes += 1;
    await art.save();

    res.json({
      success: true,
      likes: art.likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};