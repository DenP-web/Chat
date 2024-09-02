const MessageModel = require("../models/MessageModel");
const { getIO, getSocketIdByUserId } = require("../socket/socketConfig");
const fetchQuote = require("./fetchQuote");

const sendBotQuote = async (chatId, bot, user) => {
  try {
    const quote = await fetchQuote();
    await new Promise((res) => setTimeout(res, 3000));
    const message = new MessageModel({
      chatId,
      message: quote,
      sender: bot._id,
    });
    
    const socketId = getSocketIdByUserId(user._id.toString());
    const io = getIO();

    if (io && socketId) {
      try {
        io.to(socketId).emit("newMessage", {message:quote, sender: bot});
      } catch (error) {
        console.log("Error emitting message:", error);
      }
    } else {
      console.log(`No socketId found for user: ${bot}}`);
    }

    await message.save();
  } catch (error) {
    console.error("Error sending bot quote:", error);
  }
};

module.exports = sendBotQuote;
