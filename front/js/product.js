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
        });
   
        addToCart(product);
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
            let productQty = document.querySelector("#quantity").value;
            let color = document.querySelector("#colors").value;
            localStorageCheck(productQty);
            messageBasket(product, color, productQty);
        }else {
            alert("Merci de renseigner correctement les champs Couleur et Quantité")
        }
    })
}

function localStorageCheck(productQty) {
    let key = id + "_" + document.querySelector("#colors").value;
    localStorage.getItem(key)
    if(key in localStorage){
        localStorage[key] = productQty;
        localStorage.getItem(key);
    } else{
        localStorage = [];
        localStorage[key] += productQty;
        localStorage.setItem(key, productQty);
    }
    
}
/*cart = getCart();
if (key in cart) {
    cart[key] += quantity;
} else {
    cart[key] = quantity;
}
setCart(cart); */

//Crée le message
function messageBasket(product, color, productQty) {
    let messageBasket = document.createElement("div");
    messageBasket.style.minWidth = "200px";
    messageBasket.style.backgroundColor = "#2c3e50";
    messageBasket.style.position = "absolute";
    messageBasket.style.top = "100px";
    messageBasket.style.padding = "18px 28px"
    messageBasket.style.borderRadius = "40px";
    messageBasket.textContent = `Vous avez ajouté ${productQty} Kanap ${product.name} ${color} à votre panier !`;
    document.querySelector(".item__content__addButton").style.position = "relative";
    document.querySelector('.item__content__addButton').appendChild(messageBasket);
}