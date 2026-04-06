

const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  role: String,
  loginTime: {
    type: Date,
    default: Date.now,
  },
  ip: String,
});

module.exports = mongoose.model("LoginLog", loginLogSchema);