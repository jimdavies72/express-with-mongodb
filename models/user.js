const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);

//User has to be capitalised
module.exports = User;
