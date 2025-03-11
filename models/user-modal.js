const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  picture: String,
  isAdmin: Boolean,
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
