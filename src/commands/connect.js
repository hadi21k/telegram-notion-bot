const User = require("../models/user.model");
const bot = require("../utils/bot");

const connect = async (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "Click on the link to connect your Notion account: ",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Connect",
              url:
                process.env.NOTION_AUTH_URL + "&state=" + `telegram_${chatId}`,
            },
          ],
        ],
      },
    }
  );
};

module.exports = connect;
