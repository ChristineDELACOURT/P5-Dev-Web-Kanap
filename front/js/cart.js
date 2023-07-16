main();

async function main()
{
  // Déclaration des variables du panier
  var index = 0;
  var total = {"Produits" : 0 ,"Prix" : 0 };
  // Traitement des éléments du panier
  while (localStorage.key(index) != null) {
    var elementPanier = lectureElementPanier(index);
    var product = await getProduct(elementPanier._idProduct);
    console.log("product " + product);
    var total = calculTotal(elementPanier,product,total);
    affichageHtml(elementPanier,product);
    console.log("localStorage.key( " + index + " )" +  localStorage.key(index));
    console.log("(localStorage.key(index) != null)" +  (localStorage.key(index) != null));
    index++; 
}
  var nombreTotalElement = document.querySelector("#totalQuantity");
  nombreTotalElement.innerText = total.Produits; 
  var prixTotalPanier = document.querySelector("#totalPrice");
  prixTotalPanier.innerText = total.Prix; 
}
async function getProduct(_idProduct)
{
  const response = await fetch("http://localhost:3000/api/products/" + _idProduct);
  const product = response.json();
  return product;
}
// Récupération du contenu du panier 
function lectureElementPanier(index) {
  var elementPanier = {"clefProduit" : "0" ,"_idProduct" : "0" ,"color" : "0" ,"quantite" : "0" };
  elementPanier.clefProduit = localStorage.key(index);
  mots = elementPanier.clefProduit.split('_');
  elementPanier._idProduct = mots[0];
  elementPanier.color = mots[1];
  elementPanier.quantite = Number(window.localStorage.getItem(elementPanier.clefProduit));
  console.log("clefProduit " + elementPanier.clefProduit);
  console.log("index " + index);
  console.log("_idProduct " + elementPanier._idProduct);
  console.log("color " + elementPanier.color);
  console.log("quantite " + elementPanier.quantite);
  return elementPanier;
}
function affichageHtml(elementPanier,product) {
  // Construction du html
// Récupération de l'élément du DOM qui accueillera le produit
const sectionElement = document.querySelector("#cart__items");
// Création des balises relatives à un canapé
const itemElement = document.createElement("article");
  itemElement.className = "cart__item";
  itemElement.id = elementPanier._idProduct;
  itemElement.style.color = elementPanier.color;
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
  couleurElement.innerText = elementPanier.color;
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
  InputQuantite.value = elementPanier.quantite;
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
}
function calculTotal(elementPanier,product,total) { 
total.Produits += Number(elementPanier.quantite);
total.Prix += Number(elementPanier.quantite * product.price);
console.log("nombreTotalProduits " + total.Produits);
console.log("prixTotal " + total.Prix);  
return total;
}
