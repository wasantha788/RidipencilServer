import Message from "../models/message.js";

/* ======================================================
   SEND MESSAGE
====================================================== */
export const sendMessage = async (req, res) => {
  try {
    const { user_name, user_email, message } = req.body;

    // Validation
    if (!user_name || !user_email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create Message
    const newMessage = await Message.create({
      user_name,
      user_email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   GET ALL MESSAGES
====================================================== */
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   DELETE MESSAGE
====================================================== */
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};