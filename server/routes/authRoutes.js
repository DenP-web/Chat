const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  googleLoginSuccess,
  googleLoginFail,
  logout,
  checkUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", protect, checkUser);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  googleLoginSuccess
);

router.get("/login/failed", googleLoginFail);
router.post("/logout", logout);

module.exports = router;
