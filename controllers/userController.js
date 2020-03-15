const modelProduct = require("../models/modelProduct");
const modelCategory = require("../models/modelCategory");
const modelCarousel = require("../models/modelCarousel");
const modelMarket = require("../models/modelMarket");

const active_slider = {img: "slide-1.jpg"};
const sliders = [{img: "slide-2.jpg"}, {img: "slide-3.jpg"},{img: "slide-4.jpg"},{img: "slide-5.jpg"}];

exports.getProducts = (req,res,next)=>{
    const productlist = modelProduct.getProduct();
    const categorylist = modelCategory.getCategories();
    const sliders = modelCarousel.getCarouselImages();
    const marketList = modelMarket.getMarkets();
    res.render("user/p_index",
        {
        title: "marketsende | Anasayfa",
        products: productlist,
        categoryList:categorylist,
        sliders:sliders,
        marketList: marketList
        })

};

exports.detailPage = (req,res,next)=> {
    const categorylist = modelCategory.getCategories();
    const marketList = modelMarket.getMarkets();
    const id = req.params.productID;
    const product = modelProduct.getByID(id);
    res.render("user/detailPage", {title: product.name, product:product, categoryList:categorylist, marketList:marketList });
};

exports.getProductsbyCategoryId = (req,res,next)=> {
    const category = modelCategory.getCategories();
    const products = modelProduct.getProductsbyCategory(req.params.categoryid);
    const cname = modelCategory.getCategoryName(req.params.categoryid);
    const marketList =modelMarket.getMarkets();
    res.render("user/productlist-category", {title:cname, products:products, categories:category, cname:cname, marketList:marketList});
};
