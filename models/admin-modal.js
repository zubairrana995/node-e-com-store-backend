const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  picture: String,
  products: {
    type: Array,
    default: [],
  },
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
