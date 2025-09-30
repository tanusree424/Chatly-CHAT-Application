import MessageModel from "../Models/MessageModel.js";
import ConversationModel from "../Models/Conversation.model.js";
import uploadCloudinary from "../config/cloudinary.js";
import { io, onlineUsers } from "../Socket/Socket.js";
export const sendMessage = async (req, res) => {
  const { receiver } = req.params;
  const senderId = req.userId;
  const { message } = req.body;
  let image;

  if (req.file) {
    image = await uploadCloudinary(req.file.path);
  }

  try {
    // 🔹 Conversation খুঁজে বের করা
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiver] },
    });

    // 🔹 নতুন message তৈরি করা
    const newMessage = new MessageModel({
      sender: senderId,
      receiver: receiver,
      message: message,
      image: image,
    });

    // 🔹 Conversation update/save করা
    if (!conversation) {
      conversation = new ConversationModel({
        participants: [senderId, receiver],
        messages: [newMessage._id],
      });
      await conversation.save();
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    // 🔹 Message save করা
    await newMessage.save();

    // ==========================
    // ✅ Socket.IO Emit Section
    // ==========================
    const receiverSocketId = onlineUsers[receiver]; // ✅ object থেকে receiverId match
    if (receiverSocketId) {
      console.log(`📩 Message sent to ${receiver}: ${message}`);
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        message,
        image,
      });
    } else {
      console.log(`⚠️ Receiver ${receiver} is offline. Message saved to DB.`);
    }

    res
      .status(201)
      .json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to send message: ${error.message}` });
  }
};
export const getMessages = async (req, res) => {
    try {
        let sender = req.userId;
        let { receiver } = req.params;
        let conversation = await ConversationModel.findOne({
            participants: { $all: [sender, receiver] }
        }).populate('messages');
        if (!conversation) {
            return res.status(204).json({ messages: "No Messages Found" });
        }
        res.status(200).json({ messages: conversation?.messages });
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve messages: ${error.message}` });
    }
};