const productModel = require("../models/product.model");

class Product {
  static getProducts = async (req, res) => {
    try {
      const searchQuery = req.query.q;
      const products = await productModel
        .find(searchQuery ? { name: new RegExp(searchQuery, "i") } : {})
        .populate("category")
        .populate("brand");
      res.send(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static getProduct = async (req, res) => {
    try {
      const product = await productModel
        .findById(req.params.id)
        .populate("category")
        .populate("brand");
      res.send(product);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
}

module.exports = Product;
