const init = async function() {
    const productCart = await getProductLS();
    //deleteItem(productCart);
    checkProductLS();
};

init();

function getProductLS() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    productCart = Object.entries(cart);
    return productCart;
};

function saveCart(product){
    return localStorage.setItem("cart", JSON.stringify(product))
};

const cartItem = document.querySelector("#cart__items");

async function checkProductLS() {
    const productCart = await getProductLS();
    if(productCart.length === 0) {
        cartItem.textContent = "Le panier est vide";
    }
    else {
        productCart.forEach(item => {
            let product = item[0];
            let id = product.split("_")[0];
            let color = product.split("_")[1];
            let quantity = item[1];
            displayProduct(id, color, quantity);
        });
    };
};

function displayProduct(id, color, quantity) {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then(function(product) {
        document.getElementById("cart__items")
        .innerHTML +=
        `<article class="cart__item" data-id="${id}" data-color="${color}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${color}</p>
                    <p>${product.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                </div>
            </div>
        </article>`;
        totalPrice();
        totalItems();
        changeQty();
    })
}

function totalPrice() {
    let quantities = document.querySelectorAll(".itemQuantity");
    let prices = document.querySelectorAll(".cart__item__content__description");
    let cartPrice = 0;
    for (let i = 0; i < prices.length; i++) {
      cartPrice +=
        parseInt(prices[i].lastElementChild.textContent) * quantities[i].value;
    }
    document.getElementById("totalPrice").textContent = cartPrice;

}

function totalItems (){
    cart = JSON.parse(localStorage.getItem("cart"));
    let aQuantity = Object.values(cart);
    let countItems = 0;
    for( let quantity in aQuantity) {
        countItems += aQuantity[quantity];
    }
    document.getElementById("totalQuantity").innerText = countItems;

}

async function changeQty() {
    let kanap = await getProductLS();
    let inputQty = document.querySelectorAll(".itemQuantity");
    inputQty.forEach((item)=> {
        item.addEventListener("change", (element) => {
            const id = element.target.closest(".cart__item").dataset.id;
            const color = element.target.closest(".cart__item").dataset.color;
            let kanapFind = kanap.find((item) => { 
                let product = item[0];
                let idLs= product.split("_")[0];
                let colorLs = product.split("_")[1];
                return idLs === id && colorLs === color;
              });
            item.value = element.target.value;
            
            totalItems();
            totalPrice();
            
        })
    })
}