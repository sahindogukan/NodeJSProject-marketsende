const products = [
    {id: "m12345", name:"Urun1", desc:"Ürün açýklamasý", price: "29.90", sale:"35.90", img: "mar1.jpg", marketid: "1", categoryid:"1"},
    {id: 12346, name:"Urun2", desc:"Ürün açýklamasý", price: "8,50", sale:"11.90", img: "mar2.jpg",  marketid: "2", categoryid:"1"},
    {id: 12347, name:"Urun3", desc:"Ürün açýklamasý", price: "17.95", sale:"22.90", img: "mar3.jpg",  marketid: "3", categoryid:"1"},
    {id: 12348, name:"Urun7", desc:"Ürün açýklamasý", price: "3.25", sale:"4.25", img: "mar4.jpg", marketid: "4", categoryid:"1"},
    {id: 12349, name:"Urun4", desc:"Ürün açýklamasý", price: "135.00", sale:"159.00", img: "tek3.jpg", marketid: "5", categoryid:"2"},
    {id: 12340, name:"Urun5", desc:"Ürün açýklamasý", price: "1399.0", sale:"1599.0", img: "tek1.jpg", marketid: "6", categoryid:"2"},
    {id: 12341, name:"Urun6", desc:"Ürün açýklamasý", price: "45.90", sale:"55.90", img: "tek4.jpg", marketid: "1", categoryid:"2"},
    {id: 12342, name:"Urun7", desc:"Ürün açýklamasý", price: "150.00", sale:"169.00", img: "tek5.jpg", marketid: "2", categoryid:"2"},
    {id: 12377, name:"Urun1", desc:"Ürün açýklamasý", price: "6.90", sale:"9.45", img: "evyas1.jpg", marketid: "3", categoryid:"3"},
    {id: 12333, name:"Urun2", desc:"Ürün açýklamasý", price: "160.90", sale:"179.90", img: "evyas2.jpg", marketid: "4", categoryid:"3"},
    {id: 12371, name:"Urun3", desc:"Ürün açýklamasý", price: "28.90", sale:"35.90", img: "evyas3.jpg", marketid: "5", categoryid:"3"},
    {id: 12122, name:"Urun3", desc:"Ürün açýklamasý", price: "55.90", sale:"85.90", img: "evyas4.jpg", marketid: "6", categoryid:"3"},
    {id: 12349, name:"Urun4", desc:"Ürün açýklamasý", price: "13.90", sale:"16.95", img: "koz1.jpg", marketid: "1", categoryid:"4"},
    {id: 12423, name:"Urun5", desc:"Ürün açýklamasý", price: "15.95", sale:"18.90", img: "koz2.jpg", marketid: "2", categoryid:"4"},
    {id: 19862, name:"Urun6", desc:"Ürün açýklamasý", price: "6.90", sale:"8.95", img: "koz3.jpg", marketid: "3", categoryid:"4"},
    {id: 11266, name:"Urun7", desc:"Ürün açýklamasý", price: "23.90", sale:"27.90", img: "koz4.jpg", marketid: "4", categoryid:"4"},
    {id: 13254, name:"Urun1", desc:"Ürün açýklamasý", price: "39.95", sale:"49.90", img: "anbe1.jpg",marketid: "5", categoryid:"5"},
    {id: 12145, name:"Urun2", desc:"Ürün açýklamasý", price: "110.90", sale:"127.90", img: "anbe2.jpg", marketid: "6", categoryid:"5"},
    {id: 98563, name:"Urun3", desc:"Ürün açýklamasý", price: "8.99", sale:"12.99", img: "anbe3.jpg", marketid: "1", categoryid:"5"},
    {id: 32456, name:"Urun3", desc:"Ürün açýklamasý", price: "125.90", sale:"155.90", img: "anbe4.jpg", marketid: "2", categoryid:"5"},
    {id: 77166, name:"Urun4", desc:"Ürün açýklamasý", price: "3.90", sale:"5.90", img: "kir1.jpg", marketid: "3", categoryid:"6"},
    {id: 35489, name:"Urun5", desc:"Ürün açýklamasý", price: "8.95", sale:"10.90", img: "kir2.jpg", marketid: "4", categoryid:"6"},
    {id: 46544, name:"Urun6", desc:"Ürün açýklamasý", price: "25.90", sale:"35.90", img: "kir3.jpg", marketid: "5", categoryid:"6"},
    {id: 46466, name:"Urun7", desc:"Ürün açýklamasý", price: "39.90", sale:"45.90", img: "kir4.jpg", marketid: "6", categoryid:"6"}];


module.exports = class Product {

    constructor(name, desc, price, sale, img, marketid,categoryid) {
        this.id = (Math.floor(Math.random() * 10000 + 1)).toString();
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.sale = sale;
        this.img = img;
        this.marketid = marketid;
        this.categoryid = categoryid ;
    }

    saveProduct() {
        products.push(this)
    }

    static getProduct() {
        return products;
    }

    static getByID(id) {
       const product = products.find(i=>i.id == id);
       return product;
    }

    static editProduct(id,name,desc,price,marketid,categoryid,oldPrice) {
        const editProduct = products.find(i=>i.id == id);
        if (oldPrice === price) {
            editProduct.name = name;
            editProduct.desc = desc;
            /*editProduct.img = product.img;*/
            editProduct.marketid = marketid;
            editProduct.categoryid = categoryid;
        }else{
            editProduct.name = name;
            editProduct.desc = desc;
            /*editProduct.img = img;*/
            editProduct.marketid = marketid;
            editProduct.sale = oldPrice;
            editProduct.price = price;
            editProduct.categoryid = categoryid;
        }
    };
    static deleteProduct(id){
        const index = products.findIndex(i=>i.id == id);
        products.splice(index,1);
    };

    static getProductsbyCategory(id){
        return products.filter(i=>i.categoryid == id)
    }
};