// socketConfig.js
const { Server } = require("socket.io");
const sharedsession = require("express-socket.io-session");

let io;
const userSocketMap = new Map();

const setupSocketIO = (server, sessionMiddleware) => {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.use(sharedsession(sessionMiddleware, { autoSave: true }));

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    const session = socket.handshake.session;
    const userId = session.passport?.user;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      session.socketId = socket.id;
      session.save();
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    }

    socket.on("disconnect", () => {
      if (userId) {
        userSocketMap.delete(userId);
        console.log(`${userId} disconnected`);
        delete session.socketId;
        session.save();
        io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
      }
    });
  });
  return io;
};

const getSocketIdByUserId = (userId) => userSocketMap.get(userId);

const getIO = () => io;

module.exports = { setupSocketIO, getSocketIdByUserId, getIO };
