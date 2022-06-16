const addressModel = require("../../models/address.model");

class Address {
    static showAddresses = async (req, res) => {
        try {
          const addresses = await addressModel.find({user_id: req.user._id});
          res.send(addresses);
        }
        catch (e) {
          res.status(400).send(e.message);
        }
      }
    
      static addAddress = async (req, res) => {
        try {
          const address = new addressModel({user_id:req.user._id, ...req.body});
          await address.save();
          res.send(address);
        } catch (e) {
          res.status(400).send(e.message);
        }
      };
    
      static updateAddress = async (req, res) => {
        try {
          const address = await addressModel.findOneAndUpdate(
            {user_id: req.user._id, _id: req.params.id},
            req.body,
            {
              returnDocument: "after",
            }
          );
          if (!address) {
            res.status(404).send("Address not found");
          }
          else {
            res.send(address);
          }
        } catch (e) {
          res.status(400).send(e.message);
        }
      };
    
      static deleteAddress = async (req, res) => {
        try {
          const address = await addressModel.findOneAndDelete(
              {user_id: req.user._id, _id: req.params.id});
          if (!address) {
            res.status(404).send("Address not found");
          }
          else {
            res.send(address);
          }
        } catch (e) {
          res.status(400).send(e.message);
        }
      };
};

module.exports = Address;