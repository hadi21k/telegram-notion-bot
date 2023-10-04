const logger = require("../middlewares/logger");
const User = require("../models/user.model");
const bot = require("../utils/bot");

const start = async (msg) => {
  const chatId = msg.chat.id;
  try {
    const userExists = await User.findOne({ chatId });

    if (!userExists) {
      await User.create({
        username: msg.from.username ? msg.from.username : null,
        chatId,
      });
    }

    bot.sendMessage(chatId, "Welcome to Notion Bot!");
  } catch (error) {
    logger.error(error.message);
    bot.sendMessage(chatId, "Something went wrong!");
  }
};

module.exports = start;
