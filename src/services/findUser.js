const User = require("../models/user.model");

const findOneUserAndPopulate = async (query, populate) => {
  const user = await User.findOne(query, "access_token database").populate(populate);

  return user;
};

module.exports = findOneUserAndPopulate;
