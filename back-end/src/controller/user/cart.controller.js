const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");

class Cart {
  static addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
      const product = await productModel.findById(productId);
      if (!product) {
        res.status(404).send("Product not found");
        return;
      }
      const cart = await cartModel.findOne({ user_id: req.user._id });
      if (cart) {
        const itemIndex = cart.items.findIndex(
          (p) => p.product_id == productId
        );
        if (itemIndex >= 0) {
          const productItem = cart.items[itemIndex];
          productItem.quantity = quantity;
          cart.items[itemIndex] = productItem;
        } else {
          cart.items.push({
            product_id: productId,
            quantity: quantity,
            name: product.name,
            price: product.price,
          });
        }
        cart.subtotal = 0;
        cart.items.forEach(
          (product) => (cart.subtotal += product.price * product.quantity)
        );
        await cart.save();
        res.status(201).send(cart);
      } else {
        const newCart = new cartModel({
          user_id: req.user._id,
          items: [
            {
              product_id: productId,
              quantity: quantity,
              name: product.name,
              price: product.price,
            },
          ],
          subtotal: product.price * quantity,
        });
        await newCart.save();
        res.status(201).send(newCart);
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static showCart = async (req, res) => {
    try {
      const cart = await cartModel.findOne({ user_id: req.user._id });
      res.send(cart);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static removeFromCart = async (req, res) => {
    const { productId } = req.body;
    try {
      const cart = await cartModel.findOne({ user_id: req.user._id });
      const itemIndex = cart.items.findIndex((p) => p.product_id == productId);
      if (itemIndex >= 0) {
        cart.items.splice(itemIndex, 1);
        cart.subtotal = 0;
        cart.items.forEach(
          (product) => (cart.subtotal += product.price * product.quantity)
        );
        await cart.save();
        res.send(cart);
      } else {
        res.status(404).send("Product not found");
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
}

module.exports = Cart;
