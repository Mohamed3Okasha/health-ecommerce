const productModel = require("../../models/product.model");
const brandModel = require("../../models/brand.model");
const categoryModel = require("../../models/category.model");

class Product {
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
            return;
          }
          res.send(result);
        } catch (e) {
          res.status(400).send(e.message);
        }
      };
}

module.exports = Product;