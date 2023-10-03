const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../middlewares/logger");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = connectToDB;
