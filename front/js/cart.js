/*1: Récupérer les produits du LS done
2: Afficher les produits du LS sur la page panier done
=====>"bug à corriger: itération de plusieurs mêmes produits sur la page panier
3: gestion qté par user grâce au LS, créer fonctions avec eventListener qui permettent de modifier la qté d'un produit,
 ou de le supprimer
 ====> btn supprimer addEventListener (click, faire en sorte que suppression du LS (LS.removeItem à mon avis))
 ====> btn gestion qté: comment faire pour que le LS s'actualise en fonction de qté sélectionnée par user ?
4: check input user: regex ???
======> Pour prénom, nom, ville: retirer les nombres
======> Pour email: faire en sor que l'adresse mail soit au format abc@def.com ou autre
*/
getLSProduct();



//Récupère les données du LS, en indiquant également la somme du tableau des quantités
function getLSProduct () {
    for(let i = 0; i < localStorage.length; i++) {
        //Sépare la clé du LS pour récupérer les valeurs id et couleur
        let key = localStorage.key(i)
        const keySplit = localStorage.key(i).split("_");
        let id = keySplit[0];
        let color = keySplit[1];
        const array = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let total = 0;
        //Additionne les quantités de chaque tableau 'produit' pour en faire une quantité totale par produit
        for (let i = 0; i < array.length; i++) {
            total += array[i];
        }

        const product = JSON.parse(localStorage.getItem(key));
        //console.log(products);
        for (let i of product) {
            fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => res.json())
            .then(function(product) {
                document.getElementById("cart__items")
                .innerHTML +=
                `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
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
                                <p>Qté : ${total}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${total}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                             </div>
                        </div>
                    </div>
                </article>`
            })
            
        }
    }
}
