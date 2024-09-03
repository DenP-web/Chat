export const API_URL = "https://chat-sa6m.onrender.com";
export const GOOGLE_LOGIN_URL = API_URL + "/api/auth/google/callback";

export const ROUTES = {
  CHAT_URL: "/",
  AUTH_URL: "/auth",
};

export const patterns = {
  fullName: {
    regex: /^[a-zA-Z\s]+$/,
    errorMessage: "Full name should only contain letters and spaces.",
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Invalid email address.",
  },
  password: {
    regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    errorMessage:
      "Password must be 8+ characters with a number, an uppercase, and a lowercase letter.",
  },
};
