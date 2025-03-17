const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const {
  uploadProduct,
  getProducts,
} = require("../controllers/productController");
const {
  authAdminMiddleware,
  authUserMiddleware,
} = require("../middlewares/authMiddleware");

router.get(
  "/upload",
  authAdminMiddleware,
  upload.single("image"),
  uploadProduct
);
router.get("/products", authUserMiddleware, getProducts);
module.exports = router;
