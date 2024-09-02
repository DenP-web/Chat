const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatModel', required: true },
    message: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model('Message', messageSchema);
