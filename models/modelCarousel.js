const activeImg = {img: "slide-1.jpg"};
const images =
    [
        {id:1, img:"slide-1.jpg",  desc:"Deneme açıklama", isActive:"active"},
        {id:2, img:"slide-2.jpg",  desc:"Deneme açıklama", isActive:"notactive"},
        {id:3, img:"slide-3.jpg",  desc:"Deneme açıklama", isActive:"notactive"},
        {id:4, img:"slide-4.jpg",  desc:"Deneme açıklama", isActive:"notactive"},
        {id:5, img:"slide-5.jpg",  desc:"Deneme açıklama", isActive:"notactive"}
    ];

module.exports = class Carousel {
    constructor(img,desc,isActive)
    {
        this.id = images.length + 1;
        this.img = img;
        this.desc = desc;
        this.isActive= isActive;
    };

    saveCarousel()
    {
        images.push(this);
    };

    static getCarouselImages()
    {
        return images;
    }

    static getImagesCount(){
        return images.length;
    }

    static getCarouselbyID(id){
        const carousel = images.find(i=>i.id == id);
        return carousel;
    }
    static searcActive()
    {
        if (images.length > 0 && images.find(i=>i.isActive==="active"))
            {
                const activeC = images.find(i=>i.isActive==="active");
                activeC.isActive = "notactive"
            }
    }

    static getEditCarousel(id,desc,isActive,img){
        const editCarousel = images.find(i=>i.id == id);
        editCarousel.img = img;
        editCarousel.desc = desc;
        editCarousel.isActive = isActive;
    }

    static getDeleteCarousel(id){
        const index = images.findIndex(i=>i.id == id);
        const img = images.find(i=>i.id == id);
        if (img.isActive)
        {
            if (images.length != 1)
            {
                images.splice(index,1);
                images[0].isActive = true;
            }else{
                images.splice(index,1)
            }

        }else
        {
            images.splice(index,1)
        }




    }
};