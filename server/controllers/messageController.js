const MessageModel = require("../models/MessageModel");
const ChatModel = require("../models/ChatModel");

const { isValidObjectId } = require("mongoose");
const sendBotQuote = require("../utils/sendBotQuote");
const { getSocketIdByUserId, getIO } = require("../socket/socketConfig");

const { messages } = require("../utils/messages");

// Helper functions
const findChatAndCheckParticipant = async (chatId, userId) => {
  const chat = await ChatModel.findById(chatId).populate({
    path: "participants",
    select: "-password",
  });

  if (!chat) return { error: messages.error.chatNotFound };

  const isParticipant = chat.participants.some((p) => p._id.equals(userId));
  if (!isParticipant) return { error: messages.error.notParticipant };

  return { chat };
};

const findReceiverBotAndNotify = (participants, chatId, user) => {
  const receiverBot = participants.find((p) => p.isBot);
  if (receiverBot) {
    sendBotQuote(chatId, receiverBot, user);
  }
};

const notifyReceiver = (participants, user, io, message) => {
  const receiverNotBot = participants.find(
    (p) => !p._id.equals(user._id) && !p.isBot
  );

  if (receiverNotBot) {
    const socketId = getSocketIdByUserId(receiverNotBot._id.toString());
    if (socketId) {
      io.to(socketId).emit("newMessage", { message, sender: user });
    } else {
      console.log(`No socketId found for user: ${receiverNotBot.fullName}`);
    }
  }
};

// Controller methods
exports.send = async (req, res) => {
  const { chatId, message } = req.body;
  const user = req.user;

  if (!message)
    return res.status(400).json({ message: messages.error.fieldsRequired });
  if (!isValidObjectId(chatId))
    return res.status(400).json({ message: messages.error.invalidId });

  try {
    const { chat, error } = await findChatAndCheckParticipant(chatId, user._id);
    if (error) return res.status(400).json({ message: error });

    const userMessage = new MessageModel({ chatId, message, sender: user._id });
    await userMessage.save();

    findReceiverBotAndNotify(chat.participants, chatId, user);

    res.status(201).json({ message: messages.success.messageSend });

    const io = getIO();
    if (io) notifyReceiver(chat.participants, user, io, message);
  } catch (error) {
    console.error(error);
    if (!res.headersSent)
      res.status(500).json({ error: messages.error.serverError });
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  const user = req.user;

  if (!isValidObjectId(chatId))
    return res.status(400).json({ message: messages.error.invalidId });

  try {
    const { chat, error } = await findChatAndCheckParticipant(chatId, user._id);
    if (error) return res.status(400).json({ message: error });

    const messagesList = await MessageModel.find({ chatId: chat._id }).populate(
      {
        path: "sender",
        select: "-password",
      }
    );

    res.status(200).json({ messages: messagesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: messages.error.serverError });
  }
};

exports.updateMessage = async (req, res) => {
  const user = req.user;
  const { messageId, message } = req.body;

  if (!isValidObjectId(messageId))
    return res.status(400).json({ message: messages.error.invalidId });
  if (!message)
    return res.status(400).json({ message: messages.error.fieldsRequired });

  try {
    const updatedMessage = await MessageModel.findOneAndUpdate(
      { sender: user._id, _id: messageId },
      { message },
      { new: true }
    );

    if (!updatedMessage)
      return res.status(404).json({ message: messages.error.messageNotFound });

    res.status(200).json({ message: messages.success.updated });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: messages.error.serverError, error: error.message });
  }
};
