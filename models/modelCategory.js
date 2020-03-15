const Categories = [
    {id:1, name:"Market", desc:"Açıklama Deneme"},
    {id:2, name:"Elektronik", desc:"Açıklama Deneme"},
    {id:3, name:"Ev&Yaşam", desc:"Açıklama Deneme"},
    {id:4, name:"Kozmetik & Kişisel Bakım", desc:"Açıklama Deneme"},
    {id:5, name:"Anne & Bebek", desc:"Açıklama Deneme"},
    {id:6, name:"Kırtasiye", desc:"Açıklama Deneme"}
];

module.exports = class Category {
    constructor(name,desc){
        this.id = (Categories.length+1).toString();
        this.name = name;
        this.desc = desc;
    }

    saveCategory(){
        Categories.push(this);
    };

    static getCategoryName(id){
        const cname = Categories.find(i=>i.id == id);
        return cname.name;
    };

    static getCategories(){
        return Categories;
    }
    static getCategoryByID(id){
      return Categories.find(i=>i.id == id);
    };
    static editCategory(category){
        const editCategory = Categories.find(i=>i.id == category.id);
        editCategory.name = category.name;
        editCategory.desc = category.desc;
    }
    static deleteCategory(id){
        const index = Categories.findIndex(i=>i.id == id);
        Categories.splice(index,1);
    }
};