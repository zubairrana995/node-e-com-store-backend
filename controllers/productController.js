const productModal = require("../models/product-model");
const userModel = require("../models/user-model");

module.exports.uploadProduct = async (req, res) => {
  let { name, price, discount, bgColor, textColor, panelColor } = req.body;
  let product = await productModal.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgColor,
    textColor,
    panelColor,
  });
  res.send("Product uploaded successfully");
};
module.exports.getProducts = async (req, res) => {
  let products = await productModal.find();
  res.send(products);
};
module.exports.addToCartProduct = async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let product = await productModal.findById(req.params.id);
  user.cart.push(product);
  await user.save();
  res.send("Product added to cart successfully");
};
module.exports.cartProducts = async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  res.send(user.cart);
};
module.exports.removeProductFromCart = async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let product =
    user.cart.indexOf(req.params.id) > -1
      ? user.cart.splice(user.cart.indexOf(req.params.id), 1)
      : null;
  await user.save();
  res.send("Product removed from cart successfully");
};
