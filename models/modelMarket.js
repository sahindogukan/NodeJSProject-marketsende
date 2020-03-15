const markets =
    [
        {id: 1, name:"bim", logoImg:"bim.png"},
        {id: 2, name:"a-101", logoImg:"a-101.png"},
        {id: 3, name:"carrefour", logoImg:"carrefour.png"},
        {id: 4, name:"migros", logoImg:"migros.png"},
        {id: 5, name:"sok", logoImg:"sok.png"},
        {id: 6, name:"yunus", logoImg:"yunus.png"},
    ];

module.exports = class Market
{
    constructor(name,logoImg)
    {
        this.id = markets.length + 1;
        this.name = name;
        this.logoImg = logoImg;
    }

    addMarket(){
        markets.push(this);
    }
    static getMarkets(){
        return markets;
    }

    static getMarketbyID(id)
    {
        return markets.find(i=>i.id == id);
    }

    static editMarket(market,name)
    {
        const editMarket = markets.find(i=>i.id == market.id);
        editMarket.name = name;
        editMarket.logoImg = market.logoImg;
    }

    static deleteMarket(id)
    {
        const index = markets.findIndex(i=>i.id == id);
        markets.splice(index,1);
    }

};



