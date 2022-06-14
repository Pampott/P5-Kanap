

function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
};

function setCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart))
};

function checkCart() {
    const cart = getCart();
    if(cart.length === 0) {
        cartItem.textContent = "Le panier est vide";
    }
    else {
        displayProduct();
    }
};

async function displayProduct(id, color, quantity) {
    cart = getCart();
    for(product in cart){
        id = product.split("_")[0];
        color = product.split("_")[1];
        quantity = cart[product];

        await fetch(`http://localhost:3000/api/products/${id}`)
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
            
        })
        
    }
    changeQty(quantity);
    deleteItem(cart);
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
    cart = getCart();
    let aQuantity = Object.values(cart);
    let countItems = 0;
    for( let quantity in aQuantity) {
        countItems += aQuantity[quantity];
    }
    document.getElementById("totalQuantity").innerText = countItems;

}

function changeQty(quantity) {
    let product = getCart();
    productId = Object.keys(product)
    let inputQty = document.querySelectorAll(".itemQuantity");
    inputQty.forEach(input => {
        input.addEventListener("change", ()=> {
            const id = input.closest(".cart__item").dataset.id;
            const color = input.closest(".cart__item").dataset.color;
            const itemInLs = id + "_" + color;
            quantity = input.value;
            for(item in cart){
                if(item === itemInLs) {
                    cart[item] = parseInt(quantity);
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            }
            totalItems();
            totalPrice();
            document.location.reload();
        }) 
    })
} 

function deleteItem(cart) {
    cart = getCart();
    const deleteBtn = document.querySelectorAll(".deleteItem");
    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", ()=> {
            id = btn.closest(".cart__item").dataset.id;
            color = btn.closest(".cart__item").dataset.color;
            itemInLs = id + "_" + color;
            
            for(item in cart) {
                if(item === itemInLs) {
                    delete cart[item];
                    btn.closest(".cart__item").remove();
                    localStorage.setItem("cart", JSON.stringify(cart))
                }
            }
            totalItems();
            totalPrice();
            document.location.reload();
        })
    })
}

const cartItem = document.querySelector("#cart__items");
function init() {
getCart();
checkCart();
};

init();