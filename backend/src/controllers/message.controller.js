import User from "../models/users.model.js";
import Message from "../models/messages.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

//

export async function getUsersList(req, res) {
  try {
    const loggedInUserID = req.user?._id;
    const users = await User.find({ _id: { $ne: loggedInUserID } }).select(
      "-password"
    );
    res.status(200).json({
      data: users,
      length: users.length,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//

//

export async function sendMessage(req, res) {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user?.id;
    const { content, attachment } = req.body || {}; //prevent app from crashing due to destructuring, use a default value
    if ((!content || !content.trim()) && !attachment) {
      return res
        .status(400)
        .json({ message: "Content or attachment is required" });
    }

    let imageURL;
    if (attachment) {
      const cloudinaryImgURL = await cloudinary.uploader.upload(attachment);
      imageURL = cloudinaryImgURL.secure_url;
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content: content || undefined,
      attachment: imageURL,
    });

    const savedMessage = await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      data: savedMessage,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Message sending unsuccessful",
      error: error.error?.Message || error.message,
    });
    console.log("Error in sendMessage controller:", error.message, error);
  }
}

//

//

export async function getMessages(req, res) {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user?._id;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: userToChat },
        { sender: userToChat, receiver: senderId },
      ],
    });
    res
      .status(200)
      .json({ data: messages, message: "Messages fetched successfully" });
  } catch (error) {
    res.status(500).json({
      message: "message fetching unsuccessful",
      error: error.message,
    });
  }
}
