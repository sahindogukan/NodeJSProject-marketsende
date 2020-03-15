const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getProducts);

router.get("/detail/:productID", userController.detailPage);

router.get("/categories/:categoryid", userController.getProductsbyCategoryId);

module.exports = router;

