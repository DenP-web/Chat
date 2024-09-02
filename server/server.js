require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const passport = require("passport");
const router = require("./routes");

const { initializeUsersBot } = require("./utils/initializeFeatures");

const { setupSocketIO } = require("./socket/socketConfig");
const { sessionMiddleware } = require("./middleware/sessionMiddleware");
const { connectToDatabase } = require("./db");

const { PORT = 10000 } = process.env;
const dirname = path.resolve();

require("./passport")(passport);

const app = express();
const server = http.createServer(app);

app.use(sessionMiddleware);
app.use(express.json());
app.use(require("./middleware/corsMiddleware"));
app.use(passport.initialize());
app.use(passport.session());

const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

setupSocketIO(server, sessionMiddleware);

initializeUsersBot();

app.use("/api", router);

app.use(express.static(path.join(dirname, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(dirname, "client", "dist", "index.html"));
});

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

const runApp = async () => {
  await connectToDatabase();
  startServer();
};

runApp();
