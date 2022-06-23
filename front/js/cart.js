//Partie Panier
//Fonction qui récupère le panier depuis le LS
function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
};

//Si le LS n'est pas vide, affiche les produits stockés dans le LS
function checkCart() {
    const cart = getCart();
    if(cart.length === 0) {
        cartItem.textContent = "Le panier est vide";
    }
    else {
        displayProduct();
    }
};

//Affiche chaque produit du LS
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

//Calcule le prix total du panier
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

//Calcule le nombre total d'articles présents dans le panier
function totalItems (){
    cart = getCart();
    let aQuantity = Object.values(cart);
    let countItems = 0;
    for( let quantity in aQuantity) {
        countItems += aQuantity[quantity];
    }
    document.getElementById("totalQuantity").innerText = countItems;

}

//Change la quantité d'un produit
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

//Supprime un produit du panier
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

//Partie formulaire
const regexName = /^[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]{2,}$/;
const regexAddress = /[^\.\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+$/gm;
const regexMail = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
const submitOrder = document.getElementById("order");
let prenom = document.getElementById("firstName");
let nom = document.getElementById("lastName");
let ville = document.getElementById("city");
let adresse = document.getElementById("address");
let mail = document.getElementById("email");

function firstNameCheck(){
    const pErrorMessage = document.getElementById("firstNameErrorMsg");
    prenom.addEventListener("change", ()=> {
        if(regexName.test(prenom.value) === false) {
            pErrorMessage.innerText = "Veuillez entrer un prénom sans caractères spéciaux";
            prenom.style.backgroundColor = "#ed300e";
        } else {
            prenom.style.backgroundColor = "#42f560";
            pErrorMessage.style.display = "none";
            
        }
    })
}

function lastNameCheck(){
    const nErrorMessage = document.getElementById("lastNameErrorMsg");
    nom.addEventListener("change", ()=> {
        if(regexName.test(nom.value) === false) {
            nErrorMessage.innerText = "Veuillez entrer un nom sans caractères spéciaux";
            nom.style.backgroundColor = "#ed300e";
        } else {
            nom.style.backgroundColor = "#42f560";
            nErrorMessage.style.display = "none";
        }
    })
}

function cityCheck() {
    const vErrorMessage = document.getElementById("cityErrorMsg");
    ville.addEventListener("change", ()=>{
        if(regexName.test(ville.value) === false) {
            vErrorMessage.innerText = "Veuillez entrer un nom de ville valide";
            ville.style.backgroundColor = "#ed300e";
        } else {
            ville.style.backgroundColor = "#42f560";
            vErrorMessage.style.display = "none";
        }
    })
}

function addressCheck() {
    const aErrorMessage = document.getElementById("addressErrorMsg");
    adresse.addEventListener("change", ()=>{
        if(regexAddress.test(adresse.value) === false) {
            aErrorMessage.innerText = "Veuillez renseigner une adresse valide";
            adresse.style.backgroundColor = "#ed300e";
        } else {
            adresse.style.backgroundColor = "#42f560";
            aErrorMessage.style.display = "none";
        }
    })
}

function mailCheck() {
    const mErrorMessage = document.getElementById("emailErrorMsg");
    mail.addEventListener("change", ()=>{
        if(regexMail.test(mail.value) === false) {
            mErrorMessage.innerText = "Veuillez renseigner une adresse e-mail valide";
            mail.style.backgroundColor = "#ed300e";
        } else {
            mail.style.backgroundColor = "#42f560";
            mErrorMessage.style.display = "none";
        }
    })
}

function formTest(){
    firstNameCheck();
    lastNameCheck();
    cityCheck();
    addressCheck();
    mailCheck();
}



function formCheck() {
    if(regexName.test(prenom.value) === true &&
    regexName.test(nom.value) === true &&
    regexName.test(ville.value) === true &&
    regexAddress.test(adresse.value) === true &&
    regexMail.test(mail.value) === true) {
        return true;
    } else {
        return false;
    }
}

//Crée l'objet contact qui va nous servir pour la com avec le back
function createContact() {
    const contact = {
            firstName: prenom.value,
            LastName: nom.value,
            adress: adresse.value,
            city: ville.value,
            email: mail.value
        }
    return contact;
}

//Crée le tableau contenant les produits
function createArrayProducts(){
    let cart = getCart();
    let products = [];
    for(product in cart) {
        let id = product.split("_")[0];
        products.push(id.toString());
    }
    return products;
}

submitOrder.addEventListener("click", (event)=> {
    formTest();
    formCheck();
    if(formCheck()) {
        let contact = createContact();
        let products = createArrayProducts();
        if(products !== 0) {
            let order = {contact, products};
            console.log(order);
            let url = "http://localhost:3000/api/products" + "/order";
            fetch(url, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            })
            .then((res) => res.json())
            .then((data) => {
                /*let cart = getCart();
                cart = [];
                localStorage.setItem("cart", JSON.stringify(cart));*/
                console.log(data);
                window.location = `./confirmation.html?orderId=${data.orderId}`;
            })
            .catch((err) => {
                console.log("Problème rencontré avec fetch" + err);
            })
        }
    }
    event.preventDefault();
})
const cartItem = document.querySelector("#cart__items");
function init() {
getCart();
checkCart();
};

init();
