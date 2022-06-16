const cartModel = require("../../models/cart.model");
const orderModel = require("../../models/order.model");

class Order {
  static createOrder = async (req, res) => {
    try {
      const cart = await cartModel.findOne({ user_id: req.user._id });
      if (!cart.items[0]) {
        res.status(400).send("Cannot initiate order when cart is empty");
        return;
      }
      const order = new orderModel({
        user_id: req.user._id,
        items: cart.items,
        subtotal: cart.subtotal,
        payment_method: req.body.payment_method,
        address_id: req.body.address_id,
      });
      await order.save();
      res.status(201).send(order);
      cart.items = [];
      cart.subtotal = 0;
      await cart.save();
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static showOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({ user_id: req.user._id });
      res.send(orders);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
}

module.exports = Order;
