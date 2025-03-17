const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const {
  addToCartProduct,
  cartProducts,
  removeProductFromCart,
} = require("../controllers/productController");
const { authUserMiddleware } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  res.send("User Route");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/add-to-cart/:id", authUserMiddleware, addToCartProduct);
router.get("/cart", authUserMiddleware, cartProducts);
router.get("/remove-from-cart/:id", authUserMiddleware, removeProductFromCart);
module.exports = router;
