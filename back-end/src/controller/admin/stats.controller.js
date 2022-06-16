const userModel = require("../../models/user.model");
const orderModel = require("../../models/order.model");

class Stats {
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

module.exports = Stats;