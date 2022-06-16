const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const userController = require("../controller/user/user.controller");
const cartController = require("../controller/user/cart.controller");
const orderController = require("../controller/user/order.controller");
const addressController = require("../controller/user/address.controller");

router.post("/users", userController.register);
router.post("/users/login", userController.login);
router.post("/users/logout", auth, userController.logout);
router.post("/users/logoutAll", auth, userController.logoutAll);
router.get("/users/me", auth, userController.me);

router.post("/cart", auth, cartController.addToCart);
router.get("/cart", auth, cartController.showCart);
router.delete("/cart", auth, cartController.removeFromCart);

router.get("/orders", auth, orderController.showOrders);
router.post("/addOrder", auth, orderController.createOrder);

router.get("/addresses", auth, addressController.showAddresses);
router.post("/address", auth, addressController.addAddress);
router.put("/address/:id", auth, addressController.updateAddress);
router.delete("/address/:id", auth, addressController.deleteAddress);

module.exports = router;
