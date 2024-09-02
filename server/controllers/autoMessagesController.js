const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");

const { getSocketIdByUserId, getIO } = require("../socket/socketConfig");
const fetchQuote = require("../utils/fetchQuote");

let intervalId;
// Helper functions
async function getRandomChat(userId) {
  try {
    const chats = await ChatModel.find({
      participants: { $in: userId },
    }).populate({
      path: "participants",
      select: "-password",
    });
    const chatsWithBots = chats.filter((chat) =>
      chat.participants.some((p) => p.isBot)
    );
    if (chatsWithBots.length === 0) {
      return { botSender: null, randomChat: null };
    }

    const randomChat =
      chatsWithBots[Math.floor(Math.random() * chatsWithBots.length)];
    const botSender = randomChat.participants.find((p) => p.isBot);
    return { botSender, randomChat };
  } catch (error) {
    console.log(error);
    return { botSender: null, randomChat: null };
  }
}

// Controller methods
exports.startAutoMessages = async (req, res) => {
  const { _id: userId } = req.user;


  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const socketId = getSocketIdByUserId(userId.toString());
    const io = getIO();

    intervalId = setInterval(async () => {
      try {
        const { botSender, randomChat } = await getRandomChat(userId);
        if (!randomChat) {
          clearInterval(intervalId);
          return res.status(404).json({ message: "No chats with bot found." });
        }

        const quote = await fetchQuote();
        const message = new MessageModel({
          chatId: randomChat._id,
          sender: botSender,
          message: quote,
        });

        await message.save();

        if (io && socketId) {
          try {
            io.to(socketId).emit("autoMessage", { message: message.message, sender: botSender });
          } catch (error) {
            console.log("Error emitting message:", error);
          }
        } else {
          console.log(`No socketId found for user`);
        }
      } catch (error) {
        clearInterval(intervalId);
        console.error("Error fetching quote or saving message:", error);
      }
    }, 5000);

    return res.status(200).json({ message: "Auto messages started." });
  } catch (error) {
    console.error("Error starting auto messages:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.stopAutoMessages = (req, res) => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Auto messages stopped.");
    res.status(200).json({ message: "Auto messages stopped." });
  } else {
    console.log("No auto messages are currently active.");
    res.status(200).json({ message: "Auto messages stopped." });
  }
};
