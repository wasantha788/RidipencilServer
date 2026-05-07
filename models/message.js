import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },

    user_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "date",
      updatedAt: false,
    },
  }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;