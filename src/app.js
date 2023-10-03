const express = require("express");
const connectToDB = require("./utils/connectToDB");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");
const bot = require("./utils/bot");

dotenv.config();

const authRouter = require("./routes/auth.route.js");

const start = require("./commands/start");
const connect = require("./commands/connect");
const createDatabase = require("./commands/createDatabase");
const addToDatabase = require("./commands/addToDatabase");

const app = express();

bot.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "connect", description: "Connect your Notion account" },
  {
    command: "create",
    description: "Send a Notion page URL to create a database"
  },
  {
    command: "add",
    description: "Add a new link to the database",
  },
]);

bot.onText(/\/start/, start);
bot.onText(/\/connect/, connect);
bot.onText(/\/create (.+)/, createDatabase);
bot.onText(/\/add (\S+) (.+) (.+)/, addToDatabase);
app.use("/api/auth", authRouter);

bot.on("polling_error", (error) => logger.error(error));

app.listen(process.env.PORT, async () => {
  await connectToDB();
  logger.info("Connected to MongoDB");
  logger.info("Server is running on port 3000");
});
