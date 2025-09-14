// glue between view and model
// controlls the I/O in UI
import productOperation from "../services/product-operation.js";

async function loadPizza(){
    const pizzas = await productOperation.loadProduct();
    for(let pizza of pizzas){
        preparePizzacard(pizza);
    }
}
loadPizza();

function addToCart(){
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('product-id');
    productOperation.search(pizzaId);
    printbasket();
    printCheckout();
}

function removeFromCart(){
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('product-id');
    productOperation.removeProduct(pizzaId);
    printbasket();
    printCheckout();
}

function preparePizzacard(pizza) {
    const outputDiv = document.querySelector('#output');

    const colDiv = document.createElement('div');
    colDiv.className = 'col-sm-6 col-md-4 col-lg-3 mb-4'; // responsive column

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card h-100 shadow-sm'; // h-100 makes equal height
    colDiv.appendChild(cardDiv);

    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = "card-img-top";
    cardDiv.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';
    cardDiv.appendChild(cardBody);

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    cardBody.appendChild(h5);

    const pTag = document.createElement('p');
    pTag.className = 'card-text text-muted';
    pTag.innerText = pizza.desc;
    cardBody.appendChild(pTag);

    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);
    button.className = 'btn btn-primary mt-auto'; // mt-auto pushes button to bottom
    button.innerText = 'Add To Cart';
    cardBody.appendChild(button);

    outputDiv.appendChild(colDiv);
}

function printbasket() {
    const cartproducts = productOperation.getProductsIncart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = ''; 

    for (let product of cartproducts) {
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const outterdiv = document.createElement('div');
        outterdiv.innerHTML = `<div class="fw-bold">${product.name}</div>`;

        const price = document.createElement('span');
        price.className = "badge bg-secondary rounded-pill me-2";
        price.innerText = `$${product.price}`;

        const removeButton = document.createElement('button');
        removeButton.setAttribute('product-id', product.id);
        removeButton.addEventListener('click', removeFromCart);
        removeButton.className = "btn btn-sm btn-outline-danger";
        removeButton.innerText = 'Remove';

        li.appendChild(outterdiv);
        li.appendChild(price);
        li.appendChild(removeButton);

        basket.appendChild(li);
    }
}

function printCheckout() {
    const totalPrice = productOperation.checkOut();
    const checkout = document.querySelector('#checkout');
    checkout.innerHTML = '';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card shadow-sm';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'card-header text-center fw-bold';
    headerDiv.innerText = "CHECKOUT";

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'card-body text-center';
    
    const h5 = document.createElement('h5');
    h5.className = "card-title";
    h5.innerText = "Payable Amount";

    const p = document.createElement('p');
    p.className = 'card-text fs-4 fw-semibold text-success';
    p.innerText = `$${totalPrice}`;

    const button = document.createElement('button');
    button.className = "btn btn-success w-100";
    button.id = 'rzp-button1';
    button.addEventListener('click', () => paymentGateWay(totalPrice));
    button.innerText = "Pay Now";

    checkout.appendChild(cardDiv);
    cardDiv.appendChild(headerDiv);
    cardDiv.appendChild(bodyDiv);
    bodyDiv.appendChild(h5);
    bodyDiv.appendChild(p);
    bodyDiv.appendChild(button);
}
