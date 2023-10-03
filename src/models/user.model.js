const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  access_token: {
    type: Schema.Types.ObjectId,
    ref: "Token",
  },
  database: {
    type: Schema.Types.ObjectId,
    ref: "Database",
  },
});

const User = model("User", userSchema);

module.exports = User;
