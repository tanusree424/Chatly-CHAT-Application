import mongoose from "../config/db.js";

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, default: "" },
    image: { type: String , default: "" },
}, {timestamps: true});


const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
