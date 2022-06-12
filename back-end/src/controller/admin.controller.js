const productModel = require("../models/product.model");
const brandModel = require("../models/brand.model");
const categoryModel = require("../models/category.model");

class Admin {
  static addBrand = async (req, res) => {
    const brand = new brandModel(req.body);
    try {
      await brand.save();

      res.status(201).send(brand);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static getAllBrands = async (req, res) => {
    const brands = await brandModel.find();
    try {
      res.send(brands);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static updateBrand = async (req, res) => {
    try {
      const brand = await brandModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnDocument: "after",
        }
      );
      res.send(brand);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static deleteBrand = async (req, res) => {
    try {
      const result = await brandModel.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).send("Brand not found");
      }
      res.send(result);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static addCategory = async (req, res) => {
    const category = categoryModel(req.body);
    try {
      await category.save();

      res.status(201).send(category);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static getAllCategories = async (req, res) => {
    const categories = await categoryModel.find();
    try {
      res.send(categories);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static updateCategory = async (req, res) => {
    try {
      const brand = await categoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnDocument: "after",
        }
      );
      res.send(brand);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static deleteCategory = async (req, res) => {
    try {
      const result = await categoryModel.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).send("Category not found");
      }
      res.send(result);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static addProduct = async (req, res) => {
    try {
      req.body.category = (
        await categoryModel.findOne({
          name: req.body.category,
        })
      )._id;
      req.body.brand = (await brandModel.findOne({ name: req.body.brand }))._id;
      const product = new productModel(req.body);
      await product.save();
      res.send(product);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const product = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnDocument: "after",
        }
      );
      res.send(product);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const result = await productModel.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).send("Product not found");
      }
      res.send(result);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
}

module.exports = Admin;
