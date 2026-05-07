import mongoose from "mongoose";

const artSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: [String],
      default: [],
    },

    image: {
      type: [String],
      required: true,
      default: [],
    },

    videos: {
      type: [String],
      default: [],
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Art = mongoose.models.Art || mongoose.model("Art", artSchema);

export default Art;