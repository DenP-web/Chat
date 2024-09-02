const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = { connectToDatabase };
