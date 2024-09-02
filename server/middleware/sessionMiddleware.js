const session = require("express-session");
const MongoStore = require("connect-mongo");
const { MONGODB_URI, SESSION_SECRET, NODE_ENV } = process.env;

const sessionStore = MongoStore.create({
  mongoUrl: MONGODB_URI,
  collectionName: "sessions",
});


const sessionMiddleware = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: NODE_ENV === "production",
    httpOnly: true,
    maxAge: 30 * 60 * 1000, // 30 min
    sameSite: 'lax'
  },
});

module.exports = { sessionMiddleware };
