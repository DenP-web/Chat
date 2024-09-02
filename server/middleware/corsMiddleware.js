const cors = require("cors");
const { CLIENT_URL } = process.env;

const corsMiddleware = cors({
  origin: CLIENT_URL,
  credentials: true,
});

module.exports = corsMiddleware;
