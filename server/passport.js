const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("./models/UserModel");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://chat-sa6m.onrender.com/api/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, emails, photos } = profile;
        const email = emails[0].value;
        const profilePic = photos[0].value;
        let user = await UserModel.findOne({ googleId: id });

        if (!user) {
          user = new UserModel({
            googleId: id,
            fullName: displayName,
            email: email,
            profilePic: profilePic,
          });
          await user.save();
        }
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
};
