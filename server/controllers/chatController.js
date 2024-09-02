const ChatModel = require("../models/ChatModel");
const UserModel = require("../models/UserModel");

const { isValidObjectId } = require("mongoose");

const { messages } = require("../utils/messages");

// Controller methods
exports.createChat = async (req, res) => {
  const user = req.user;
  const { receiverId } = req.body;

  if (!isValidObjectId(receiverId)) {
    return res.status(400).json({ message: messages.error.invalidId });
  }

  try {
    const receiver = await UserModel.findById(receiverId).select("-password");
    if (!receiver) {
      return res.status(404).json({ message: messages.error.userNotFound });
    }

    let chat = await ChatModel.findOne({
      participants: { $all: [user._id, receiver._id] },
    }).populate({
      path: "participants",
      select: "-password",
    });

    if (!chat) {
      chat = new ChatModel({ participants: [user._id, receiver._id] });
      await chat.save();
      chat = await ChatModel.findById(chat._id).populate({
        path: "participants",
        select: "-password",
      });
      return res.status(201).json({ chat, message: messages.success.createChat });
    }

    res.status(200).json({ chat, message: messages.success.chatExists });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: messages.error.serverError });
  }
};

exports.getChats = async (req, res) => {
  const user = req.user;
  try {
    const chats = await ChatModel.find({ participants: user._id })
      .populate({ path: "participants", select: "-password" });
    res.status(200).json({ chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: messages.error.serverError });
  }
};

exports.deleteChat = async (req, res) => {
  const user = req.user;
  const { chatId } = req.params;

  if (!isValidObjectId(chatId)) {
    return res.status(400).json({ message: messages.error.invalidId });
  }

  try {
    const chat = await ChatModel.findOne({
      _id: chatId,
      participants: user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: messages.error.chatNotFound });
    }

    chat.participants = chat.participants.filter(participant => !participant.equals(user._id));

    if (chat.participants.length === 0) {
      await ChatModel.deleteOne({ _id: chatId });
      return res.status(200).json({ message: messages.success.chatDeleted });
    }

    await chat.save();
    res.status(200).json({ message: messages.success.leftChat });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: messages.error.serverError });
  }
};
