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
              url: `https://api.notion.com/v1/oauth/authorize?client_id=04014f17-ddeb-4130-8d79-9648831d937b&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fnotion%2Fcallback&state=telegram_${chatId}`,
            },
          ],
        ],
      },
    }
  );
};

module.exports = connect;
