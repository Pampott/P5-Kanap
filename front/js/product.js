let id = (new URL(document.location).searchParams.get("id"));

getProduct()

function getProduct() {
let item = document.querySelector(".item")
let product = fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then(function(product) {
        item.querySelector(".item__img")
        .insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl} "alt="${product.altTxt}"></img>`);
        document.getElementById("title").innerText = product.name;
        document.getElementById("price").innerText = product.price;
        document.getElementById("description").innerText = product.description;
        for (let i = 0; i < product.colors.length; i++) {
            document.getElementById("colors").appendChild(createNewOption(product.colors[i]))
          }
          addToCart(product);
        });
   
}
//Crée une nouvelle option
function createNewOption(value) {
    let newOption = document.createElement("option", value);
    newOption.setAttribute("value", `${value}`);
    newOption.innerText = value;
    return newOption;

}

function addToCart(product){
    document.querySelector("#addToCart").addEventListener("click", function(){
        if(document.querySelector("#quantity").reportValidity() &&
            document.querySelector("#colors").value != "") {
            let quantity = document.querySelector("#quantity").value;
            let color = document.querySelector("#colors").value;
            localStorageCheck(quantity);
            displayMessage(product, color, quantity);

        }else {
            alert("Merci de renseigner correctement les champs Couleur et Quantité")
        }
    })
}

function localStorageCheck(quantity) {
    let key = id + "_" + document.querySelector("#colors").value;
    localStorage.getItem(key)
    if(key in localStorage){
        localStorage[key] = quantity;
        localStorage.getItem(key);
    } else{
        localStorage = [];
        localStorage[key] += quantity;
        localStorage.setItem(key, quantity);
    }
    
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
    //Fais disparaitre le message après 2 secondes
    setTimeout(function() {
        message.style.display = "none";
    }, 2000)
}

/*cart = getCart();
if (key in cart) {
    cart[key] += quantity;
} else {
    cart[key] = quantity;
}
setCart(cart); */
