const { Client } = require("@notionhq/client");
const findOneUserAndPopulate = require("../services/findUser");
const logger = require("../middlewares/logger");
const bot = require("../utils/bot");
const { decrypt } = require("../utils/security");
const { linkPageSchema } = require("../utils/notiondb");

const addToDatabase = async (msg, url, title, category) => {
  const chatId = msg.chat.id;

  try {
    const user = await findOneUserAndPopulate(
      { chatId },
      "database access_token"
    );

    if (!user || !user.access_token) {
      throw new Error("You are not connected, please /connect");
    }

    const { access_token } = user.access_token;

    const decryptToken = decrypt(access_token);

    const notion = new Client({ auth: decryptToken });

    await notion.pages.create(
      linkPageSchema(user.database.id, title, category, url)
    );

    bot.sendMessage(chatId, "Link added");
  } catch (error) {
    logger.error(error);
    bot.sendMessage(chatId, error.message || "Something went wrong");
  }
};

module.exports = addToDatabase;
