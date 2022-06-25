let id = (new URL(document.location).searchParams.get("id"));

getProduct();

//Fonction qui récupère uniquement le produit à l'id correspondant
function getProduct() {
let item = document.querySelector(".item")
let product = fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then(function(product) {
        //Insère l'image récupérée via fetch
        item.querySelector(".item__img")
        .insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl} "alt="${product.altTxt}"></img>`);
        //Insère le nom du produit
        document.getElementById("title").innerText = product.name;
        //Insère le prix du produit
        document.getElementById("price").innerText = product.price;
        //Insère la description du produit
        document.getElementById("description").innerText = product.description;
        //Pour chaque couleur du produit, insère une nouvelle option
        for (let i = 0; i < product.colors.length; i++) {
            document.getElementById("colors").appendChild(createNewOption(product.colors[i]));
        }
        addProduct(product);
    });  
}

//Crée une nouvelle option
function createNewOption(value) {
    let newOption = document.createElement("option", value);
    newOption.setAttribute("value", `${value}`);
    newOption.innerText = value;
    return newOption;

}

//Ajoute le produit au panier si les conditions sont remplies
function addProduct(product){
    document.querySelector("#addToCart").addEventListener("click", function(){
        if(document.querySelector("#quantity").reportValidity() &&
            document.querySelector("#colors").value != "") {
            let quantity = parseInt(document.querySelector("#quantity").value);
            let color = document.querySelector("#colors").value;
            let item = id + "_" + document.querySelector("#colors").value;
            displayMessage(product, color, quantity);
            addCart(item, quantity);
        }else {
            alert("Merci de renseigner le nombre d'articles et la couleur");
        }
    })
}

//Crée le message pour informer l'utilisateur de l'ajout de son produit au panier
function displayMessage(product, color, quantity) {
    let message = document.createElement("div");
    message.style.minWidth = "200px";
    message.style.backgroundColor = "#2c3e50";
    message.style.position = "absolute";
    message.style.top = "100px";
    message.style.padding = "18px 28px";
    message.style.borderRadius = "40px";
    message.textContent = `Vous avez ajouté ${quantity} ${product.name} ${color} à votre panier !`;
    document.querySelector(".item__content__addButton").style.position = "relative";
    document.querySelector(".item__content__addButton").appendChild(message);
    //Fait disparaitre le message après 2 secondes
    setTimeout(function() {
        message.style.display = "none";
    }, 2000);
}


function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart === null) {
        return {};
    } else {
        return JSON.parse(cart);
    }
}

function addCart(item, quantity) {
    cart = getCart();
    if (item in cart) {
        cart[item] += quantity;
    } else {
        //cart.push(item, quantity);
        cart[item] = quantity;
    }
    saveCart(cart);
}