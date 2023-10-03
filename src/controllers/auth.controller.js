const { Client } = require("@notionhq/client");
const logger = require("../middlewares/logger");
const Token = require("../models/token.model");
const User = require("../models/user.model");
const { encrypt } = require("../utils/security");
const bot = require("../utils/bot");

const exChangeCodeForToken = async (req, res) => {
  const { code, state } = req.query;

  const notion = new Client();

  if (!code) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const data = await notion.oauth.token({
      client_id: process.env.NOTION_CLIENT_ID,
      client_secret: process.env.NOTION_CLIENT_SECRET,
      redirect_uri: process.env.NOTION_REDIRECT_URI,
      grant_type: "authorization_code",
      code,
    });

    const tokenExists = await Token.findOne({ bot_id: data.bot_id });

    if (tokenExists) {
      tokenExists.access_token = encrypt(data.access_token);
      await tokenExists.save();
      bot.sendMessage(state.split("_")[1], "You are connected");
      return res.redirect("https://web.telegram.org/a/#6668214273");
    }

    const encryptToken = encrypt(data.access_token);

    const newToken = await Token.create({
      access_token: encryptToken,
      bot_id: data.bot_id,
      workspace_id: data.workspace_id,
      workspace_name: data.workspace_name,
    });

    await User.findOneAndUpdate(
      { chatId: state.split("_")[1] },
      { $set: { access_token: newToken._id } }
    );

    bot.sendMessage(state.split("_")[1], "You are connected");
    return res.redirect("https://web.telegram.org/a/#6668214273");
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({ message: "Invalid request" });
  }
};

module.exports = {
  exChangeCodeForToken,
};
