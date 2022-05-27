let id = (new URL(document.location).searchParams.get("id"));

getProduct()

function getProduct() {
let item = document.querySelector(".item")
let product = fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then(function(apiResults) {
        product = apiResults;
        item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl} "alt="${product.altTxt}"></img>`);
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
            let productQty = JSON.parse(document.querySelector("#quantity").value);
            localStorageCheck(productQty);
        }else {
            alert("Merci de renseigner correctement les champs Couleur et Quantité")
        }
    })
}

function localStorageCheck(productQty) {
    let key = id + "_" + document.querySelector("#colors").value;
    let productLocalStorage = JSON.parse(localStorage.getItem(`${key}`));
    if(productLocalStorage){
        productLocalStorage.push(productQty);
        localStorage.setItem(`${key}`, JSON.stringify(productLocalStorage));
    } else{
        productLocalStorage = [];
        productLocalStorage.push(productQty);
        localStorage.setItem(`${key}`, JSON.stringify(productLocalStorage));
        console.log(productLocalStorage)
    }
    
}