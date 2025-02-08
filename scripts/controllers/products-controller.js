// glue between view and model
// controlls the I/O in UI
import product from "../models/product.js";
import productOperation from "../services/product-operation.js";

async function loadPizza(){
    const pizzas = await productOperation.loadProduct();
    console.log('pizzas are', pizzas);
    for(let pizza of pizzas){
        preparePizzacard(pizza);
    }
}
loadPizza();

function addToCart(){
    console.log('add to cart called' , this) // this .....it has the current object refence
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('product-id');
    console.log('pizza Id is ',pizzaId);
    productOperation.search(pizzaId);
    printbasket();
    printCheckout();
}

function removeFromCart(){
    console.log('remove button is pressed',this);
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('product-id');
    console.log('pizza id is',pizzaId);
    productOperation.removeProduct(pizzaId);
    printbasket();
    printCheckout();
}

function preparePizzacard(pizza){
    const outputDiv = document.querySelector('#output');
    
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 18rem;";
    colDiv.appendChild(cardDiv);

    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = "card-img-top";
    cardDiv.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    cardBody.appendChild(h5);

    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    cardBody.appendChild(pTag);

    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click',addToCart); // event blind
    button.className = 'btn btn-primary';
    button.innerText = 'Add To Cart';
    cardBody.appendChild(button);

    outputDiv.appendChild(colDiv);

}

function printbasket(){
    const cartproducts = productOperation.getProductsIncart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = ''; 

    for(let product of cartproducts){
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-start";

        const outterdiv = document.createElement('div');
        outterdiv.className = "ms-2 me-auto";
        outterdiv.innerText = `${product.name}`;

        const innerDiv = document.createElement('div');
        innerDiv.className = "fw-bold";
        innerDiv.innerText = `${product.price}`;

        const removeButton = document.createElement('button');
        removeButton.setAttribute('product-id',`${product.id}`);
        removeButton.addEventListener('click',removeFromCart);
        removeButton.className = "badge text-bg-primary rounded-pill";
        removeButton.innerText = 'Remove';

        basket.appendChild(li);
        li.appendChild(outterdiv);
        outterdiv.appendChild(innerDiv);
        li.appendChild(removeButton);

    
    }
}

function printCheckout(){
    const totalPrice = productOperation.checkOut();
    const checkout = document.querySelector('#checkout');
    checkout.innerHTML = '';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card ';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'card-header';
    headerDiv.innerText = "CHECKOUT";

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'card-body';
    
    const h5 = document.createElement('h5');
    h5.className = "card-title";
    h5.innerText = "Payable Amount";

    const p = document.createElement('p');
    p.className = 'card-text';
    p.innerText = totalPrice;

    const button = document.createElement('button');
    button.className = "btn btn-primary";
    button.id = 'rzp-button1';
    button.addEventListener('click',()=>paymentGateWay(totalPrice));
    button.innerText = "Pay Now";

    checkout.appendChild(cardDiv);
    cardDiv.appendChild(headerDiv);
    cardDiv.appendChild(bodyDiv);
    bodyDiv.appendChild(h5);
    bodyDiv.appendChild(p);
    bodyDiv.appendChild(button);
}
