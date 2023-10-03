const { Client } = require("@notionhq/client");
const bot = require("../utils/bot");
const { decrypt } = require("../utils/security");
const findOneUserAndPopulate = require("../services/findUser");
const logger = require("../middlewares/logger");
const Database = require("../models/database.model");
const { linkDatabaseSchema } = require("../utils/notiondb");
const extractPageIdFromUrl = require("../services/extractIdFromURL");

const createDatabase = async (msg, match) => {
  const chatId = msg.chat.id;
  const page_id = extractPageIdFromUrl(match[1]);

  try {
    const user = await findOneUserAndPopulate({ chatId }, "access_token");

    if (!user || !user.access_token) {
      throw new Error("You are not connected, please /connect");
    }

    const { access_token } = user.access_token;

    const decryptToken = decrypt(access_token);

    const notion = new Client({ auth: decryptToken });

    const notion_db = await notion.databases.create(
      linkDatabaseSchema(page_id)
    );

    if (user.database) {
      await Database.findByIdAndDelete(user.database);
    }

    const db = await Database.create({
      object: notion_db.object,
      id: notion_db.id,
      title: notion_db.title[0].text.plain_text,
      parent: notion_db.parent,
      url: notion_db.url,
    });

    user.database = db._id;

    await user.save();

    bot.sendMessage(chatId, "Database created");
  } catch (error) {
    logger.error(error.message);
    bot.sendMessage(chatId, error.message || "Something went wrong");
  }
};

module.exports = createDatabase;
