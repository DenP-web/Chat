const ChatModel = require("../models/ChatModel");
const UserModel = require("../models/UserModel");

const { initializeChats } = require("../utils/initializeFeatures");
const { generateAndSaveAvatar } = require("../utils/generateAndSaveAvatar");
const { getSocketIdByUserId } = require("../socket/socketConfig");

const { messages } = require("../utils/messages");

// Helper function
const handleUserLogin = (req, res, user) => {
  req.login(user, (err) => {
    if (err) {
      return res.status(500).json({ error: messages.error.serverError });
    }
    const { password, ...userCopy } = user.toObject();
    res
      .status(200)
      .json({ message: messages.success.loggedIn, user: userCopy });
  });
};

// Controller methods
exports.register = async (req, res) => {
  const { email, password, fullName } = req.body;
  if (!email || !password || !fullName) {
    return res.status(400).json({ message: messages.error.fieldsRequired });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: messages.error.userExists });
    }

    const avatarUrl = generateAndSaveAvatar(email);
    const newUser = new UserModel({
      email,
      password,
      fullName,
      profilePic: avatarUrl,
    });
    await newUser.save();

    await initializeChats(newUser);
    handleUserLogin(req, res, newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: messages.error.serverError });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: messages.error.fieldsRequired });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user || !user.password || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ message: messages.error.invalidCredentials });
    }

    handleUserLogin(req, res, user);
  } catch (error) {
    res.status(500).json({ error: messages.error.serverError });
  }
};

exports.checkUser = (req, res) => {
  const user = { ...req.user.toObject() };
  delete user.password;
  res.status(200).json(user);
};

exports.googleLoginSuccess = async (req, res) => {
  try {
    const user = req.user;
    const existingChats = await ChatModel.findOne({ participants: user._id });
    if (!existingChats) {
      await initializeChats(user);
    }
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ error: messages.error.serverError });
  }
};

exports.googleLoginFail = (req, res) => {
  res.clearCookie("connect.sid");
  res.status(401).json({ message: messages.error.googleAuthFailed });
};

exports.logout = (req, res) => {
  const userId = req.user ? req.user._id : null;

  if (userId) {
    const socket = getSocketIdByUserId(userId);
    if (socket) {
      socket.disconnect(true);
      console.log(`${userId} disconnected via logout with socketId: ${socket.id}`);
    }
  }

  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ error: messages.error.serverError });
    }

    // Log session before destruction
    console.log("Session before destruction:", req.session);

    // Destroy the session after logging out
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Server error while logging out" });
      }

      // Clear the cookie
      res.clearCookie("connect.sid");

      // Send a success response
      res.status(200).json({ message: "Logged out successfully" });
      console.log(`Session destroyed for userId: ${userId}`);

      // Check session store directly if possible
      // (requires custom implementation based on store)
    });
  });
};