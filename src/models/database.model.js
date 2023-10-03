const { model, Schema } = require("mongoose");

const databaseSchema = new Schema({
  object: String,
  id: {
    type: String,
    unique: true,
  },
  title: String,
  parent: {
    type: {
      type: String,
    },
    page_id: String,
  },
  url: String,
});

const Database = model("Database", databaseSchema);

module.exports = Database;
