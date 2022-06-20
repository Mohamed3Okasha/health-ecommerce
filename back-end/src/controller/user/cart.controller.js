const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");

class Cart {
  static modifyCart = async (userId, requestItems) => {
    try {
      // Find user cart
      let cart = await cartModel.findOne({ user_id: userId });
      // If the user doesn't have cart, create new one
      if (!cart) {
        cart = new cartModel({
          user_id: userId,
          items: [],
          subtotal: 0,
        });
      }
      // Itrate over the request items
      for (const item of requestItems) {
        const product = await productModel.findById(item.productId);
        // Add product to cart only if product is present on database
        if (product) {
          // Search for product on cart
          const itemIndex = cart.items.findIndex(
            (p) => p.product_id == item.productId
          );
          // If product is already on cart, update its quantity
          if (itemIndex >= 0) {
            const productItem = cart.items[itemIndex];
            productItem.quantity = item.quantity;
            cart.items[itemIndex] = productItem;
            // Otherwise, add product to cart
          } else {
            cart.items.push({
              product_id: item.productId,
              quantity: item.quantity,
              name: product.name,
              price: product.price,
            });
          }
        }
      }
      // Calculate subtotal
      cart.subtotal = 0;
      cart.items.forEach(
        (product) => (cart.subtotal += product.price * product.quantity)
      );
      // Return cart
      return cart;
    } catch (e) {
      return e.message;
    }
  };

  static addToCart = async (req, res) => {
    try {
      const cart = await this.modifyCart(req.user._id, [
        {
          productId: req.body.productId,
          quantity: req.body.quantity,
        },
      ]);
      await cart.save();
      res.status(201).send(cart);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static updateCart = async (req, res) => {
    try {
      const cart = await this.modifyCart(req.user._id, req.body.products);
      await cart.save();
      res.status(201).send(cart);
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
