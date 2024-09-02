const UserModel = require("../models/UserModel");
const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");
const fetchQuote = require("./fetchQuote");
const { generateAndSaveAvatar } = require("./generateAndSaveAvatar");

const initializeUsersBot = async () => {
  const botCount = await UserModel.countDocuments({ isBot: true });

  if (botCount > 0) return;
  await UserModel.insertMany([
    {
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "hashedPassword1",
      isBot: true,
      profilePic: generateAndSaveAvatar("john.doe@example.com"),
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      password: "hashedPassword2",
      isBot: true,
      profilePic: generateAndSaveAvatar("jane.smith@example.com"),
    },
    {
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "hashedPassword3",
      isBot: true,
      profilePic: generateAndSaveAvatar("alice.johnson@example.com"),
    },
  ]);
};

const initializeChats = async (user) => {
  const bots = await UserModel.find({ isBot: true });
  const chats = await ChatModel.insertMany([
    {
      participants: [user._id, bots[0]._id],
    },
    {
      participants: [user._id, bots[1]._id],
    },
    {
      participants: [user._id, bots[2]._id],
    },
  ]);

  for (const chat of chats) {
    const sender = chat.participants.find(
      (p) => p.toJSON() !== user._id.toJSON()
    );

    const quote = await fetchQuote();
    const message = new MessageModel({
      chatId: chat._id,
      message: quote,
      sender: sender,
    });
    await message.save();
  }
};

module.exports = {
  initializeUsersBot,
  initializeChats,
};
