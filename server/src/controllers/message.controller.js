import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUser = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const searchEmail = req.params.email;
    const getUser = await User.findOne({
      email: searchEmail,
      _id: { $ne: loggedInUserId },
    }).select("-password");

    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(getUser);
  } catch (error) {
    console.log("Error in getUser controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const userId = req.params.id;

    // Mark messages from this user as read
    await Message.updateMany(
      { senderId: userId, receiverId: myId, isRead: false },
      { $set: { isRead: true } }
    );
    const allMessages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json(allMessages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const userId = req.params.id;
    const { text, image } = req.body;

    if (!image && (!text || text.trim() === "")) {
      return res.status(400).json({ message: "Text or image is required" });
    }

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await new Message({
      senderId: myId,
      receiverId: userId,
      text,
      image: imageUrl,
    }).save();

    // realtime functionality
    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    });

    const partnerIds = messages.map((msg) => {
      return msg.senderId.toString() === myId.toString()
        ? msg.receiverId
        : msg.senderId;
    });

    const uniquePartnerIds = [
      ...new Set(partnerIds.map((id) => id.toString())),
    ];

    const chatPartners = await User.find({
      _id: { $in: uniquePartnerIds },
    }).select("-password");

    return res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in getChatPartners controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUnreadCounts = async (req, res) => {
  try {
    const myId = req.user._id;
    
    const unreadMessages = await Message.aggregate([
      { $match: { receiverId: myId, isRead: false } },
      { $group: { _id: "$senderId", count: { $sum: 1 } } },
    ]);
    
    const unreadCounts = {};
    unreadMessages.forEach((item) => {
      unreadCounts[item._id] = item.count;
    });
    
    return res.status(200).json(unreadCounts);
  } catch (error) {
    console.log("Error in getUnreadCounts controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
