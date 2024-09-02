const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const messageRouter = require('./messageRoutes')
const chatRouter = require('./chatRoutes')
const autoMessagesRoutes = require('./autoMessagesRoutes')

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/message', autoMessagesRoutes);
router.use('/message', messageRouter);
router.use('/chat', chatRouter);

module.exports = router