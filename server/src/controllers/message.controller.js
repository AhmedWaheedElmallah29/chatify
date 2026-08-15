import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContact = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password",
    );

    return res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error in getAllContact controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const userId = req.params.id;
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
