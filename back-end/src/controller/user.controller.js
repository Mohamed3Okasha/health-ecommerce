const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model")
const { sendWelcomeEmail } = require("../emails/account");

class User {
  static register = async (req, res) => {
    const user = new userModel(req.body);

    try {
      await user.save();
      sendWelcomeEmail(user.email, user.name);
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static login = async (req, res) => {
    try {
      const user = await userModel.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token
      );
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  };

  static me = async (req, res) => {
    res.send(req.user);
  };

  static addToCart = async (req, res) => {

    const {productId, quantity} = req.body;

    try {
      const product = await productModel.findById(productId);
      if (!product) {
        res.status(404).send("Product not found");
      }
      const cart = await cartModel.findOne({user_id: req.user._id});
      if (cart) {
        const itemIndex = cart.items.findIndex(p => p.product_id == productId);
        if (itemIndex >= 0) {
          const productItem = cart.items[itemIndex];
          productItem.quantity = quantity;
          cart.items[itemIndex] = productItem;
        }
        else {
          cart.items.push(
            { 
              product_id: productId,
              quantity: quantity,
              name: product.name,
              price: product.price
            }
            );
        }
        cart.subtotal = 0;
        cart.items.forEach(product => cart.subtotal += (product.price * product.quantity));
        await cart.save();
        res.status(201).send(cart);
      }

      else {
        const newCart = new cartModel(
          {
          user_id: req.user._id,
          items: [
            {
              product_id: productId,
              quantity: quantity,
              name: product.name,
              price: product.price
            }
          ]
          }
          );
          cart.subtotal = product.price * quantity;
        await newCart.save();
        res.status(201).send(newCart);
      }
    }
    catch (e) {
      res.status(400).send(e.message);
    }
  }

  static showCart = async (req, res) => {
    try {
      const cart = await cartModel.findOne({user_id: req.user._id});
      res.send(cart)
    }
    catch (e) {
      res.status(400).send(e.message);
    }
  }

  static removeFromCart = async (req, res) => {
    const {productId} = req.body;
    try {
      const cart = await cartModel.findOne({user_id: req.user._id});
      const itemIndex = cart.items.findIndex(p => p.product_id == productId);
      if (itemIndex >= 0) {
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.send(cart);
      }
      else {
        res.status(404).send("Product not found")
      }
      
    }
    catch (e) {
      res.status(400).send(e.message);
    }
  }

  static createOrder = async (req, res) => {
    try {
      const cart = await cartModel.findOne({user_id: req.user._id});
      const order = new orderModel(
        {
          user_id: req.user._id,
          items: cart.items,
          subtotal: cart.subtotal,
          payment_method: req.body.payment_method
        }
        );
      await order.save();
      res.status(201).send(order);
    }
    catch (e) {
      res.status(400).send(e.message);
    }
  }

  static showOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({user_id: req.user._id});
      res.send(orders);
    }
    catch (e) {
      res.status(400).send(e.message);
    }
  }
}

module.exports = User;
