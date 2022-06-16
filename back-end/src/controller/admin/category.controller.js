const categoryModel = require("../../models/category.model");

class Category {
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
        return;
      }
      res.send(result);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
}

module.exports = Category;
