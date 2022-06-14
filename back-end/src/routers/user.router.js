const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const userController = require("../controller/user.controller");

router.post("/users", userController.register);

router.post("/users/login", userController.login);

router.post("/users/logout", auth, userController.logout);

router.post("/users/logoutAll", auth, userController.logoutAll);

router.get("/users/me", auth, userController.me);

router.post("/cart", auth, userController.addToCart);

router.get("/cart", auth, userController.showCart);

router.delete("/cart", auth, userController.removeFromCart);

router.get("/orders", auth, userController.showOrders);

router.post("/addOrder", auth, userController.createOrder);

router.get("/addresses",auth, userController.showAddresses);

router.post("/address", auth, userController.addAddress);

router.put("/address/:id", auth, userController.updateAddress);

router.delete("/address/:id", auth, userController.deleteAddress);

module.exports = router;
