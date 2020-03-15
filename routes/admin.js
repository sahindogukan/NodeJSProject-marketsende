const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");



router.get("/", adminController.adminPage);

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product", adminController.getEditProduct);

router.get("/edit-product/:productid", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);

router.get("/delete-product/:productid", adminController.getDeleteProduct);
router.post("/delete-product", adminController.postDeleteProduct);

router.get("/category-settings",adminController.getCategoryPage);

router.get("/add-category", adminController.getAddCategory);
router.post("/add-category", adminController.postAddCategory);

router.post("/delete-category", adminController.postDeleteCategory);

router.get("/edit-category/:ctgid", adminController.getEditCategory);
router.post("/edit-category/", adminController.postEditCategory);

router.get("/slider-settings", adminController.sliderSetting);

router.get("/add-carousel", adminController.getAddCarousel);
router.post("/add-carousel", adminController.postAddCarousel);

router.get("/edit-slider/:sliderid", adminController.getEditSlider);
router.post("/edit-slider/", adminController.postEditSlider);

router.post("/delete-slider", adminController.postDeleteSlider);

router.get("/market-settings", adminController.getMarketSettings);

router.get("/add-market", adminController.getAddMarket);
router.post("/add-market", adminController.postAddMarket);

router.get("/edit-market/:marketid", adminController.getEditMarket);
router.post("/edit-market", adminController.postEditMarket);

router.post("/delete-market", adminController.deleteMarket);

module.exports= router;
