const modelProduct = require("../models/modelProduct");
const modelCategory = require("../models/modelCategory");
const modelCarousel = require("../models/modelCarousel");
const modelMarket = require("../models/modelMarket");

exports.adminPage = (req,res)=>{
    const categoryList = modelCategory.getCategories();
    const productList = modelProduct.getProduct();
    const marketList = modelMarket.getMarkets();
    res.render("admin/admin-page", {
        title: "marketsende | admin",
        products:productList,
        categoryList:categoryList,
        marketList:marketList,
        action:req.query.action})};

exports.getAddProduct = (req,res,next)=>{
    const categoryList = modelCategory.getCategories();
    const productList = modelProduct.getProduct();
    const marketList = modelMarket.getMarkets();
    res.render("admin/p_add-product", {title:"Admin | Ürün Ekle", products:productList, categoryList:categoryList, marketList:marketList})};

exports.postAddProduct = (req,res,next)=>{
    const categoryList = modelCategory.getCategories();
    const productList = modelProduct.getProduct();
    const name = req.body.name;
    const desc = req.body.desc;
    const price = req.body.price;
    const oldPrice = req.body.oldprice;
    const imgUrl = req.file;
    const marketid = req.body.marketid;
    const catID = req.body.categoryid;
    if (name != "" && desc != "" && price != "" && oldPrice != "" && marketid != "" && catID != "") {
        if (imgUrl)
        {
            const product = new modelProduct(name,desc,price,oldPrice,imgUrl.filename,marketid,catID);
            product.saveProduct();
            res.redirect("/admin?action=add");
        }else
        {
            return res.render("admin/p_add-product",
                {
                    title:"Admin | Ürün Ekle",
                    products:productList,
                    categoryList:categoryList,
                    errorMessage:"Ürün fotoğrafı boş bırakılamaz."
                })
        }

    }
        else {
            return res.render("admin/p_add-product",
                {
                title:"Admin | Ürün Ekle",
                products:productList,
                categoryList:categoryList,
                errorMessage:"Lütfen bütün alanları eksiksiz doldurunuz."}
                )
        }



};

exports.getEditProduct = (req,res,next)=>{
    const categoryList = modelCategory.getCategories();
    const product = modelProduct.getByID(req.params.productid);
    const marketList = modelMarket.getMarkets();

    res.render("admin/p_edit-product", {title:"Admin | Ürün Güncelle",
        product:product,
        categories:categoryList,
        action:req.query.action,
        marketList: marketList
    })};
exports.postEditProduct = (req,res,next)=>{
    const id= req.body.id;
    const product = modelProduct.getByID(req.body.id);
    const oldPrice = product.price;
    const name = req.body.name;
    const desc = req.body.desc;
    const price = req.body.price;
    const marketid = req.body.marketid;
    const categoryid = req.body.categoryid;
    
    if (req.file) {
        product.img = req.file.filename;
    }

    if (name === "" || desc === "" ||  price === "" ||  marketid === "") {
        res.redirect(`/admin/edit-product/${req.body.id}?action=error`)
    }else {
        modelProduct.editProduct(id,name,desc,price,marketid,categoryid,oldPrice,product);
        res.redirect("/admin?action=edit");
    }

};


exports.getDeleteProduct = (req,res,next)=>{
    const product = modelProduct.getByID(req.params.productid);
    res.render("admin/p_delete-product", {title:"Admin | Ürün Sil", product:product})};
exports.postDeleteProduct = (req,res,next) =>{
    modelProduct.deleteProduct(req.body.id);
    res.redirect("/admin?action=delete");
};

exports.getCategoryPage = (req,res,next)=>{
    const categoryList = modelCategory.getCategories();
    res.render("admin/category_settings", {title:"Admin | Kategori Ayarları", categoryList:categoryList, action:req.query.action})
};

exports.getAddCategory = (req,res,next) => {
    res.render("admin/add-category", {title:"Admin | Kategori Ekle", action:req.query.action})
};
exports.postAddCategory = (req,res,next) => {
    if (req.body.c_name != "" && req.body.c_desc !="") {
        const newCategory = new modelCategory(req.body.c_name, req.body.c_desc);
        newCategory.saveCategory();
        res.redirect("/admin/category-settings?action=add");
    }
    res.redirect("/admin/add-category?action=error");

};

exports.postDeleteCategory = (req,res,next)=> {
    modelCategory.deleteCategory(req.body.ctg_id);
    res.redirect("/admin/category-settings?action=delete");
};

exports.getEditCategory = (req,res,next) => {
    const category = modelCategory.getCategoryByID(req.params.ctgid);
    res.render("admin/edit-category", {title:"Admin | Kategori Güncelle", category:category, action:req.query.action})
};

exports.postEditCategory = (req,res,next) => {
    if (req.body.name == ""){
        res.redirect(`/admin/edit-category/${req.body.id}?action=error`)
    }
    else
        {
            const category = modelCategory.getCategoryByID(req.body.id);
            category.name = req.body.name;
            category.desc = req.body.desc;
            modelCategory.editCategory(category);
            res.redirect("/admin/category-settings?action=update");
        }
};

exports.sliderSetting = (req,res,next)=>
{
   const sliders = modelCarousel.getCarouselImages();
   res.render("admin/slider-settings",{title:"Admin | Slider Ayarları", sliders:sliders, action:req.query.action})
};

exports.getAddCarousel = (req,res,next) =>
{
    res.render("admin/add-carousel")
};

exports.postAddCarousel = (req,res,next) =>
{
    const file = req.file;
    const desc = req.body.desc;
    const isActive = req.body.isActive;
    if (file) {
      if (isActive == "active")
      {
          if ( modelCarousel.getImagesCount() != 0 )
          {
              modelCarousel.searcActive()
          }
      }

        const carousel = new modelCarousel(file.filename,desc,isActive);
        carousel.saveCarousel();

      res.redirect("/admin/slider-settings");
    }else{
        res.render("admin/add-carousel")
    }
};


exports.getEditSlider = (req,res,next)=>
{
    const carousel = modelCarousel.getCarouselbyID(req.params.sliderid);
    res.render("admin/edit-slider", {title:"Slider Guncelle", carousel:carousel, action:req.query.action})

};

exports.postEditSlider = (req,res,next)=>
{
        const carouselImg = modelCarousel.getCarouselbyID(req.body.id);
        const id =  req.body.id;
        const desc= req.body.desc;
        const isActive = req.body.isActive;
        const img = carouselImg.img;

        if (isActive == "active")
        {
            modelCarousel.searcActive();
        }
        if (req.file)
        {
            const img = req.file.filename;
        }

        modelCarousel.getEditCarousel(id,desc,isActive,img);
        res.redirect("/admin/slider-settings?action=update");
};


exports.postDeleteSlider =(req,res,next)=>
{
    modelCarousel.getDeleteCarousel(req.body.id);
    res.redirect("/admin/slider-settings");
};

exports.getMarketSettings = (req,res,next)=>
{
  const markets = modelMarket.getMarkets();
  res.render("admin/market-settings", {title: "Admin | Market Ayarları", markets:markets, action:req.query.action});
};

exports.getAddMarket = (req,res,next) =>
{
 res.render("admin/add-market", {title: "admin | Market Ekle", action:req.query.action})
};

exports.postAddMarket = (req,res,next) =>
{
    const name = req.body.name;
    const img = req.file;
    if (img) {
      if (name !== "") {
        const newMarket = new modelMarket(name, img.filename);
        newMarket.addMarket();
        res.redirect("/admin/market-settings?action=add")
      }else{
        res.redirect("/admin/add-market?action=error")
      }
    } else
    {
        res.redirect("/admin/add-market?action=imgerror")
    }
};

exports.getEditMarket = (req,res,next) =>
{
    const id = req.params.marketid;
    const market = modelMarket.getMarketbyID(id);
    res.render("admin/edit-market", {title: "admin | Market Güncelle", mar:market, action:req.query.action})
};

exports.postEditMarket = (req,res,next) =>
{
  const market = modelMarket.getMarketbyID(req.body.id);
  const name = req.body.name;
  if (req.file)
  {
    market.logoImg = req.file.filename;
  }
 if (req.body.name !== "")
 {
     modelMarket.editMarket(market,name);
     res.redirect("/admin/market-settings?action=add");
 }
 else
 {
     res.redirect(`/admin/edit-market/${req.body.id}?action=error`)
 }

};

exports.deleteMarket = (req,res,next) =>
{
   const id = req.body.id;
   modelMarket.deleteMarket(id);
   res.redirect("/admin/market-settings?action=delete")
};