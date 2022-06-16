const brandModel = require("../../models/brand.model");

class Brand {
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
}

module.exports = Brand;
