import MessageModel from "../Models/MessageModel.js";
import ConversationModel from "../Models/Conversation.model.js";
import {cloudinaryUpload} from "../Middleware/Cloudinary.js";
export const sendMessage = async (req, res) => {
    const { receiver } = req.params;
    const {senderId} =  req.userId;
    const { message } = req.body;
    let image ;
    if (req.file) {
        image = await cloudinaryUpload(req.file.path);
        
        
    }
    try {
        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiver] }
        });
          const newMessage = new MessageModel({
            sender: senderId,
            receiver: receiver,
            message: message,
            image: image
        });
        if (!conversation) {
            conversation = new ConversationModel({
                participants: [senderId, receiver],
                messages: [newMessage._id]
            });
            await conversation.save();
        }else {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }
      
        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        res.status(500).json({ error: `Failed to send message: ${error.message}` });
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