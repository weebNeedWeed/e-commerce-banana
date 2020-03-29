const express = require("express");

const apiController = require("./../controllers/api");

const router = express.Router();

router.get("/category", apiController.getAllCategory);

router.get("/category/:name", apiController.getCategory);

router.get("/product", apiController.getAllProduct);

router.get("/product/:url", apiController.getProduct);

module.exports = router;
