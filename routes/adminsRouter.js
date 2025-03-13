const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  logout,
} = require("../controllers/authController");
const { authAdminMiddleware } = require("../middlewares/authMiddleware");

router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginAdmin);
router.post("/logout", logout);
router.post("/admin-panel", authAdminMiddleware, (req, res) => {
  res.send("Admin Panel");
});
module.exports = router;
