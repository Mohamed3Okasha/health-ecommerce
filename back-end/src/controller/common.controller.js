const brandModel = require("../models/brand.model");
const categoryModel = require("../models/category.model");

class Common {
  static getAllBrands = async (req, res) => {
    const brands = await brandModel.find();
    try {
      res.send(brands);
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

  static sendImage = async (req, res) => {
    res.send(req.image);
  };
}

module.exports = Common;
