const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
}, { versionKey: false });

module.exports = mongoose.model("ChatModel", chatSchema);

