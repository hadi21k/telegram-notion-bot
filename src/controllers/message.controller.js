const start = require("../commands/start.js");
const connect = require("../commands/connect.js");
const createDatabase = require("../commands/createDatabase.js");
const addToDatabase = require("../commands/addToDatabase.js");

const newMessageController = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.end();
  }

  const { text } = message;

  const regex = /\/start|\/connect|\/create (.+)|\/add (\S+) (.+) (.+)/;
  const match = text.match(regex);

  if (match) {
    switch (match[0]) {
      case "/start":
        start(message);
        break;
      case "/connect":
        connect(message);
        break;
      case "/create":
        createDatabase(message, match[1]);
        break;
      case "/add":
        addToDatabase(message, match[1], match[2], match[3]);
        break;
      default:
        res.end();
        break;
    }
  }
};

module.exports = newMessageController;
