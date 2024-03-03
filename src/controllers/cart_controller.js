const CartModel = require("../models/cart_model");

class CartController {
  static async getCartForUser(req, res) {
    try {
      const userId = req.params.userId;

      const foundCart = await CartModel.findOne({ user: userId }).populate(
        "items.product"
      );

      if (!foundCart) {
        const newCart = await CartModel({ user: userId });
        await newCart.save();
        return res.json({ success: true, data: newCart });
      }

      return res.json({ success: true, data: foundCart });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  }

  static async addToCart(req, res) {
    try {
      const { user, product, quantity } = req.body;

      const foundCart = await CartModel.findOne({ user: user });

      //if a cart is missing .
      if (!foundCart) {
        return res.status(401).json({
          success: false,
          message: "Cart not found for the user.",
        });
      }
      //if cart already exists
      const updatedCart = await CartModel.findOneAndUpdate(
        { user: user },
        { $push: { items: { product: product, quantity: quantity } } },
        { new: true }
      ).populate("items.product");
      return res.status(200).json({
        success: true,
        data: updatedCart,
        message: "Cart Updated",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  }

  //remove item from cart
  static async removeItemFromCart(req, res) {
    try {
      const { user, product } = req.body;

      const updatedCart = await CartModel.findOneAndUpdate(
        { user: user },
        { $pull: { items: { product: product } } },
        { new: true }
      );
      return res.json({
        success: true,
        data: updatedCart,
        message: "Cart Updated",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  }
}

module.exports = CartController;
