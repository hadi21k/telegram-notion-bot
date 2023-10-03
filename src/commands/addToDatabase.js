const { Client } = require("@notionhq/client");
const findOneUserAndPopulate = require("../services/findUser");
const logger = require("../middlewares/logger");
const bot = require("../utils/bot");
const { decrypt } = require("../utils/security");
const { linkPageSchema } = require("../utils/notiondb");

const addToDatabase = async (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[1];
  const title = match[2];
  const category = match[3];

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
