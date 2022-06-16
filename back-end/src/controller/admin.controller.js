const productModel = require("../models/product.model");
const brandModel = require("../models/brand.model");
const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");
const orderModel = require("../models/order.model");

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

  static getUserStatistics = async (req, res) => {
    try {
      const users = await userModel.find({userRole: "user"});
      const userStats = {
        active: 0,
        deactivated: 0,
        suspended: 0,
        undefined: 0
      };
      users.forEach(user => userStats[user.status] += 1);
      res.send(userStats);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
  
  static getOrderStatistics  = async (req, res) => {
    try {
      const orders = await orderModel.find();
      const orderStatus = {
        "pending": 0,
        "in review": 0,
        "in progress": 0,
        "canceled": 0,
        "on the way": 0,
        "delivered": 0,
        "undefined": 0
      };
      orders.forEach(order => orderStatus[order.status] += 1);

      res.send(orderStatus);

    } catch (e) {
      res.status(400).send(e.message);
    }
  };
  
  static getIncomeStatistics  = async (req, res) => {
    try {
      const msInDay = 86400000;
      const last = req.query.last || 1;
      const orders = await orderModel.find(
        {"createdAt": {
          $gte: new Date(Date.now() - msInDay * last),
          $lte: new Date()
        }});
      let totalIncome = 0;
      orders.forEach(order => totalIncome += order.subtotal || 0);
      res.send({orders: orders, ordersCount: orders.length, income: totalIncome});
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static getNewUserStatistics = async (req, res) => {
    try {
      const msInDay = 86400000;
      const last = req.query.last || 1;
      const users = await userModel.find(
        {"createdAt": {
          $gte: new Date(Date.now() - msInDay * last),
          $lte: new Date()
        }, userRole: "user"});
      res.send({users: users, usersCount: users.length});
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
}

module.exports = Admin;
