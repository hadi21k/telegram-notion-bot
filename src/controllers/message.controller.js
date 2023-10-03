import start from "../commands/start";
import connect from "../commands/connect";
import createDatabase from "../commands/create";
import addToDatabase from "../commands/add";

const newMessageController = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.end();
  }

  const { text } = message;

  const regex = /\/start|\/connect|\/create|\/add/;
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
        createDatabase(message);
        break;
      case "/add":
        addToDatabase(message);
        break;
      default:
        res.end();
        break;
    }
  }
};

module.exports = newMessageController;
