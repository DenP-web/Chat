const express = require("express");
const router = express.Router();
const {
  createChat,
  deleteChat,
  getChats,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createChat);
router.get("/", protect, getChats);
router.delete("/:chatId", protect, deleteChat);

module.exports = router;
