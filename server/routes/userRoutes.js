const express = require("express");
const { getUsers, updateUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../multer");

const router = express.Router();

router.get("/", protect, getUsers);
router.put("/", protect, upload.single("avatar"), updateUser);

module.exports = router;
