const UserModel = require("../models/UserModel");
const { messages } = require("../utils/messages");
const path = require("path");
const fs = require("fs");


// Controller methods
exports.updateUser = async (req, res) => {
  const user = req.user;
  const { fullName } = req.body;

  if (!fullName && !req.file) {
    return res.status(400).json({ message: messages.error.fieldsRequired });
  }

  let filePath;
  if (req.file && req.file.path) {
    const fileName = path.basename(req.file.path);
    filePath = `/uploads/${fileName}`;

    if (user.profilePic) {
      const previousImagePath = path.join(__dirname, "..", user.profilePic);
      if (fs.existsSync(previousImagePath)) {
        fs.unlink(previousImagePath, (err) => {
          if (err) console.error(`Error deleting file: ${err}`);
        });
      }
    }
  }

  try {
    const updateFields = {
      ...(fullName && { fullName }),
      ...(filePath && { profilePic: filePath }),
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: messages.error.userNotFound });
    }

    req.login(updatedUser, (err) => {
      if (err)
        return res.status(500).json({ error: messages.error.serverError });
      res
        .status(200)
        .json({ message: messages.success.userUpdated});
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: messages.error.serverError });
  }
};

exports.getUsers = async (req, res) => {
  const user = req.user;

  try {
    const { search } = req.query;

    const query = {
      _id: { $ne: user._id },
      ...(search && { fullName: { $regex: search, $options: "i" } }),
    };

    const users = await UserModel.find(query).select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: messages.error.serverError });
  }
};
