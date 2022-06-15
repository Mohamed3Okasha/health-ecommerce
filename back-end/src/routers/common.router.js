const express = require("express");
const router = new express.Router();
const commonController = require("../controller/common.controller");
const upload = require("../middleware/uploadImage");

router.get("/brands", commonController.getAllBrands);
router.get("/categories", commonController.getAllCategories);
router.post("/images", upload.single("images"), commonController.sendImage);

module.exports = router;
