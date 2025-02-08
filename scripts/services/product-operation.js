// products crud operation
// C - create
// R - read
// U - update
// D - delete

import product from "../models/product.js";
import makeNetworkCall from "./api-client.js";

const productOperation={

    products:[],

    search(pizzaId){
        const product = this.products.find(currentProduct=>currentProduct.id==pizzaId);
        console.log('product found', product);
        product.isAddedInCart = true;
        console.log('array',this.products);
    },

    removeProduct(pizzaId){
        const product = this.products.find(currentProduct=>currentProduct.id==pizzaId);
        console.log('product found', product);
        product.isAddedInCart = false;
    },

    getProductsIncart(){
        const productInBasket = this.products.filter(product=>product.isAddedInCart);
        console.log(productInBasket);
        return productInBasket;
    },

    checkOut(){
        let total = 0;
        this.products.filter(product=>product.isAddedInCart).forEach(pizza => {
        total += parseFloat(pizza.price); 
        });
        total=total.toFixed(2);  // Format to 2 decimal places
        if (total<0) {
            alert("Please Select any of one Product");
        }

        console.log('Total Price of All Pizzas:', total); 
        return total;

    },

    async loadProduct(){
        const pizzas = await makeNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        const productArray = pizzaArray.map(pizza=>{
            const currentPizza = new product(pizza.id, pizza.name, pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
            return currentPizza;
        })
        console.log('Product Array', productArray);
        this.products = productArray;
        return productArray;
    },
    sortProduct(){

    },
    searchproduct(){

    }
}
export default productOperation;

