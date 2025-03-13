const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    minLength: 3,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  contact: Number,
  picture: String,
  products: {
    type: Array,
    default: [],
  },
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
