const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
mongoose
  .connect(`${config.get("MONGO_URI")}/store`)
  .then(() => {
    dbgr("Database connected");
  })
  .catch((err) => {
    dbgr(err);
  });
module.exports = mongoose.connection;
