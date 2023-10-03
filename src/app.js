const express = require("express");
const connectToDB = require("./utils/connectToDB");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");

dotenv.config();

const authRouter = require("./routes/auth.route.js");
const newMessageController = require("./controllers/message.controller.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/new-message", newMessageController);

// bot.onText(/\/start/, start);
// bot.onText(/\/connect/, connect);
// bot.onText(/\/create (.+)/, createDatabase);
// bot.onText(/\/add (\S+) (.+) (.+)/, addToDatabase);

app.use("/api/auth", authRouter);

app.listen(process.env.PORT, async () => {
  await connectToDB();
  logger.info("Connected to MongoDB");
  logger.info("Server is running on port 3000");
});
