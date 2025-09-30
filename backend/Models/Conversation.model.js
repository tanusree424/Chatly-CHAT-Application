import mongoose from "../config/db.js";

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
}, {timestamps: true});

const ConversationModel = mongoose.model("Conversation", conversationSchema);
export default ConversationModel;