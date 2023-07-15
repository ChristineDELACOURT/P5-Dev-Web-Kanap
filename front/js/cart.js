// Récupération du contenu du panier 
let index = 0;
let nombreTotalProduits = 0;
let prixTotal = 0;

while (localStorage.key(index) != null) {
  clefProduit = localStorage.key(index);
  const mots = clefProduit.split('_');
  const _idProduct = mots[0];
  const color = mots[1];
  var quantite = Number(window.localStorage.getItem(clefProduit));
  console.log("clefProduit " + clefProduit);
  console.log("index " + index);
  console.log("_idProduct " + _idProduct);
  console.log("color " + color);
  console.log("quantite " + quantite);
  async function getProduct(_idProduct) {const product = await fetch("http://localhost:3000/api/products/" + _idProduct)
  .then(product => product.json());
  console.log("product " + product);
  // Construction du html
// Récupération de l'élément du DOM qui accueillera le produit
const sectionElement = document.querySelector("#cart__items");

// Création des balises relatives à un canapé
const itemElement = document.createElement("article");
  itemElement.className = "cart__item";
  itemElement.id = _idProduct;
  itemElement.style.color = color;
const imageElement = document.createElement("div"); 
  imageElement.className = "cart__item__img";
const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
const contenuElement = document.createElement("div"); 
  contenuElement.className = "cart__item__content";
const contenuElementDescription = document.createElement("div"); 
  contenuElementDescription.class = "cart__item__content__description";
const nomElement = document.createElement("h2");
  nomElement.innerText = product.name;
const couleurElement = document.createElement("p");
  couleurElement.innerText = color;
const prixElement = document.createElement("p");
  prixElement.innerText = product.price + " €";
const contenuElementParametres = document.createElement("div"); 
  contenuElementParametres.className = "cart__item__content__settings";
const contenuElementParametresQuantite = document.createElement("div"); 
  contenuElementParametresQuantite.className = "cart__item__content__settings__quantity";
const quantiteElement = document.createElement("p");
  quantiteElement.innerText = "Quantité";
const InputQuantite = document.createElement("input");
  InputQuantite.type = "number";
  InputQuantite.name = "itemQuantity";
  InputQuantite.min = "1";
  InputQuantite.max = "100";
  InputQuantite.value = quantite;
  InputQuantite.id = "quantity";
const contenuElementParametresSupprimer = document.createElement("div"); 
  contenuElementParametresSupprimer.className = "cart__item__content__settings__delete";                  
const suppressionElement = document.createElement("p");
  suppressionElement.className = "cart__item__content__settings__delete";
  suppressionElement.innerText = "Supprimer";                  

// On rattache les balises à leur parents
sectionElement.appendChild(itemElement);
itemElement.appendChild(imageElement);
imageElement.appendChild(image);
itemElement.appendChild(contenuElement);
contenuElement.appendChild(contenuElementDescription);
contenuElementDescription.appendChild(nomElement);
contenuElementDescription.appendChild(couleurElement);
contenuElementDescription.appendChild(prixElement);
contenuElement.appendChild(contenuElementParametres);
contenuElementParametres.appendChild(contenuElementParametresQuantite);
contenuElementParametresQuantite.appendChild(quantiteElement);
quantiteElement.appendChild(InputQuantite);
contenuElementParametres.appendChild(contenuElementParametresSupprimer);
contenuElementParametresSupprimer.appendChild(suppressionElement);

nombreTotalProduits += quantite;
prixTotal += quantite * product.price;
console.log("nombreTotalProduits " + nombreTotalProduits);
console.log("prixTotal " + prixTotal);  
  var nombreTotalElement = document.querySelector("#totalQuantity");
  nombreTotalElement.innerText = nombreTotalProduits; 
  var prixTotalPanier = document.querySelector("#totalPrice");
  prixTotalPanier.innerText = prixTotal; 

  console.log("localStorage.key( " + index + " )" +  localStorage.key(index));
  console.log("(localStorage.key(index) != null)" +  (localStorage.key(index) != null));
  }
    getProduct(_idProduct)
    index++; 
}
