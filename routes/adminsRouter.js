const express = require("express");
const router = express.Router();
const Admin = require("../models/admin-modal");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let admin = await Admin.find();
    if (admin.length > 0) {
      return res
        .status(400)
        .send("You are not allowed to create another admin");
    }

    let { fullname, email, password } = req.body;
    let newAdmin = await Admin.create({
      fullname,
      email,
      password,
    });
    res.status(200).send(newAdmin);
  });
}

router.get("/", (req, res) => {
  res.send("Admins Route");
});
module.exports = router;
