const axios = require("axios");

const fetchQuote = async (retries = 2, delay = 2000,) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random/", {
      timeout: 5000,
    });
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const quote = response.data[0].q;
    return quote;
  } catch (error) {
    console.error("Error fetching quote:", error.message);

    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await new Promise((res) => setTimeout(res, delay));
      return fetchQuote(retries - 1, delay, returnDelay);
    }

    return "Sorry, I couldn't fetch a quote right now.";
  }
};

module.exports = fetchQuote;
