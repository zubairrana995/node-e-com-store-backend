const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/db-connection");
const adminsRouter = require("./routes/adminsRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminsRouter);
app.use("/user", usersRouter);
app.use("/product", productsRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
