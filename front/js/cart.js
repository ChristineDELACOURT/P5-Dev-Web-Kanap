main();
// Fonction principale
async function main()
{
  // Déclaration des variables
  var total = {"Produits" : 0 ,"Prix" : 0 };
  var index = 0;
  // Ordonnancement des éléments du panier


  // Traitement des éléments du panier index par index
  while (localStorage.key(index) != null) {
    var elementPanier = lectureElementPanier(index);
    var product = await getProduct(elementPanier._idProduct);
    console.log("product " + product); 
    total = calculTotal(elementPanier,product,total);
    console.log("total.Produits " + total.Produits);
    console.log("total.Prix " + total.Prix);  
    affichageHtml(elementPanier,product);
    console.log("localStorage.key( " + index + " )" +  localStorage.key(index));
    console.log("(localStorage.key(index) != null)" +  (localStorage.key(index) != null));
    index++; 
}
// Affichage des totaux
var nombreTotalElement = document.querySelector("#totalQuantity");
nombreTotalElement.innerText = total.Produits; 
var prixTotalPanier = document.querySelector("#totalPrice");
prixTotalPanier.innerText = total.Prix;   
// Prise en compte des modifications 
modification(total);
console.log("nombreTotalProduits apres modif" + total.Produits);
console.log("prixTotal apres modif" + total.Prix);
}

/**
 * Récupération de données utilisant l'API fetch
 * @param { String } _idProduct
 * @return { Object } product
 */
async function getProduct(_idProduct)
{
  const response = await fetch("http://localhost:3000/api/products/" + _idProduct);
  const product = response.json();
  return product;
}

/**
 * Récupération d un element du panier dans le localStorage
 * @param { Number } index
 * @return { Object } elementPanier
 */
// 
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

/**
 * Affichage du panier
 * @param { Object } elementPanier
 * @param { Object } product
 * @return { Object } elementPanier
 */
function affichageHtml(elementPanier,product,total) {
// Récupération de l'élément du DOM qui accueillera le produit
const sectionElement = document.querySelector("#cart__items");
// Création des balises relatives à un canapé
const itemElement = document.createElement("article");
  itemElement.className = "cart__item";
  itemElement.dataset.id = elementPanier.clefProduit;
  itemElement.dataset.color = elementPanier.color;
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
  quantiteElement.innerText = "Qté : ";
const InputQuantite = document.createElement("input");
  InputQuantite.type = "number";
  InputQuantite.id = elementPanier.clefProduit;
  InputQuantite.className = "itemQuantity";
  InputQuantite.name = "itemQuantity";
  InputQuantite.min = "1";
  InputQuantite.max = "100";
  InputQuantite.value = elementPanier.quantite;
const contenuElementParametresSupprimer = document.createElement("div"); 
  contenuElementParametresSupprimer.className = "cart__item__content__settings__delete";                  
const suppressionElement = document.createElement("p");
  suppressionElement.className = "deleteItem";
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

  return elementPanier,total;
}
/**
 * calcul des totaux au fur et à mesure
 * @param { Object } elementPanier
 * @param { Object } product
 * @return { Object } total
 */
function calculTotal(elementPanier,product,total) { 
total.Produits += Number(elementPanier.quantite);
total.Prix += Number(elementPanier.quantite * product.price);
console.log("nombreTotalProduits " + total.Produits);
console.log("prixTotal " + total.Prix);
return total;
}
/**
 * prise en compte des modifications
 * @param { Object } total : nombreTotalProduits,prixTotal
 */
function modification(total) { 
  let order = document.querySelector("#order");
  console.log("order " + order);
  console.log("order.submit " + order.submit);
// Modification de la quantité
//  while (order.submit = "undefined"){
  console.log("dans la boucle while ");
  const toutesLesQuantites = document.querySelectorAll(".itemQuantity");
	for (let input of toutesLesQuantites) {
    console.log("input " + input);    
input.addEventListener("change", function () {  
// recherche de l identifiant du produit grace à data-id
let clefProduitModifie = this.closest(".cart__item").dataset.id;
let nouvelleQuantite = Number(input.value);
ancienneQuantite = Number(window.localStorage.getItem(clefProduitModifie));
  if (nouvelleQuantite < 1 || nouvelleQuantite > 100) {
  alert ("La quantité doit etre comprise entre 1 et 100");
  //document.querySelector("#clefProduitModifie").innerHTML = '';
  //window.localStorage.removeItem(clefProduitModifie);
  }else{
  // navigation dans le DOM pour trouver le prix correspondant
  let p_Qte = input.parentNode;
  let div_cart__item__content__settings__quantity = p_Qte.parentNode;
  let div_cart__item__content__setting = div_cart__item__content__settings__quantity.parentNode;
  let div_cart__item__content = div_cart__item__content__setting.parentNode;
  let div_cart__item__content__description = div_cart__item__content.firstElementChild;
  let p_price = div_cart__item__content__description.lastElementChild;
  price = p_price.innerHTML.replace(' €','');
  console.log("Number(nouvelleQuantite - ancienneQuantite) " + Number(nouvelleQuantite - ancienneQuantite));  
  total.Produits += Number(nouvelleQuantite - ancienneQuantite);
  console.log("total.Prix 183 " + total.Prix );
  total.Prix += Number(Number(nouvelleQuantite - ancienneQuantite) * price);
  console.log("nouvelleQuantite !=0 " + nouvelleQuantite);
  input.value.innerHTML = nouvelleQuantite;
  window.localStorage.setItem(clefProduitModifie, nouvelleQuantite);
  var nombreTotalElement = document.querySelector("#totalQuantity");
  nombreTotalElement.innerText = total.Produits; 
  var prixTotalPanier = document.querySelector("#totalPrice");
  prixTotalPanier.innerText = total.Prix;  
  console.log("total.Produits 191 " + total.Produits );
  console.log("total.Prix 191 " + total.Prix );

  }
  });
} 
return total; 
  }

//}
