const express = require("express");
const router = express.Router();
const {
  startAutoMessages,
  stopAutoMessages,
} = require("../controllers/autoMessagesController");

const { protect } = require("../middleware/authMiddleware");

router.post("/auto-start", protect, startAutoMessages);
router.post("/auto-stop", protect, stopAutoMessages);

module.exports = router;
