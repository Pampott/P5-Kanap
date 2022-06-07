getCart();

function getCart(){
cart = JSON.parse(localStorage.getItem("cart"));
splitCart();
}

//Récupère les entrées du LS, puis sépare les données pour pouvoir récupérer l'id, la couleur, et la quantité
function splitCart(id, color, quantity){
    //Items correspond à un tableau regroupant chaque produit et sa quantité sous forme de tableau
    let items = Object.entries(cart);
    //Pour chaque tableau "item" dans "items",
    for (let item in items) {
        //Déclare le tableau
        let products = items[item];
        //Récupère la quantité correspondante
        quantity = products[1];
        //Récupère l'entrée qui comporte id+color
        let product = products[0];
        //Séparation de l'entrée afin de récupérer id et color
        id = product.split("_")[0];
        color = product.split("_")[1];
        
    }
}


