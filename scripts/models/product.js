// product js contain the structure of pizza object
// pizza object - id, name ,desc, price , rating, image

class product{
    constructor(id, name, desc, price, url){
        //this - keyword (contain current object refernce)
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.url = url;
        this.isAddedInCart = false;
    }
}
export default product;
