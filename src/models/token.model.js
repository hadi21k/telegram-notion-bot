const { model, Schema } = require("mongoose");

const tokenSchema = new Schema({
  access_token: {
    type: String,
    required: true,
  },
  bot_id: {
    type: String,
    required: true,
  },
  workspace_id: {
    type: String,
    required: true,
  },
  workspace_name: {
    type: String,
    required: true,
  },
});

const Token = model("Token", tokenSchema);

module.exports = Token;
