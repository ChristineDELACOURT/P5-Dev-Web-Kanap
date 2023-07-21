main();
// Fonction principale
async function main()
{
  // Déclaration des variables
  var total = {"Produits" : 0 ,"Prix" : 0 }; //nombre total de produits , prix total
  var index = 0; // index dans le panier : localStorage
  var contact = {
    "firstName" : "",
    "lastName" : "",
    "address" : "",
    "city" : "",
    "email" : "",
  };
  // Ordonnancement des éléments du panier


  // Traitement des éléments du panier index par index
  while (localStorage.key(index) != null) {
    var elementPanier = lectureElementPanier(index);
    var product = await getProduct(elementPanier._idProduct);
    total = calculPartiel(elementPanier,product,total);
    affichageHtml(elementPanier,product);
    index++; 
  }
  // Affichage des totaux
  var nombreTotalElement = document.querySelector("#totalQuantity");
  nombreTotalElement.innerText = total.Produits; 
  var prixTotalPanier = document.querySelector("#totalPrice");
  prixTotalPanier.innerText = total.Prix;   
  // Prise en compte des modifications et suppressions
  modification(total);
  suppression(total);
  envoiFormulaire(contact);
}

/**
 * Récupération d un produit en utilisant l'API fetch
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
function calculPartiel(elementPanier,product,total) { 
  total.Produits += Number(elementPanier.quantite);
  total.Prix += Number(elementPanier.quantite * product.price);
  return total;
}

/**
 * prise en compte des modifications
 * @param { Object } total : nombreTotalProduits,prixTotal
 */
function modification(total) { 
  const toutesLesQuantites = document.querySelectorAll(".itemQuantity");
	for (let input of toutesLesQuantites) {   
    input.addEventListener("change", function () {  
      // recherche de l identifiant du produit grace à data-id
      let clefProduitModifie = this.closest(".cart__item").dataset.id;
      let nouvelleQuantite = Number(input.value);
      let ancienneQuantite = Number(window.localStorage.getItem(clefProduitModifie));
      if (nouvelleQuantite < 1 || nouvelleQuantite > 100) {
        alert ("La quantité doit etre comprise entre 1 et 100");
      }else{
        // navigation dans le DOM pour trouver le prix correspondant
        let p_Qte = input.parentNode;
        let div_cart__item__content__settings__quantity = p_Qte.parentNode;
        let div_cart__item__content__setting = div_cart__item__content__settings__quantity.parentNode;
        let div_cart__item__content = div_cart__item__content__setting.parentNode;
        let div_cart__item__content__description = div_cart__item__content.firstElementChild;
        let p_price = div_cart__item__content__description.lastElementChild;
        let price = p_price.innerHTML.replace(' €','');
        total.Produits += Number(nouvelleQuantite - ancienneQuantite);
        total.Prix += Number(Number(nouvelleQuantite - ancienneQuantite) * price);
        input.value.innerHTML = nouvelleQuantite;
        window.localStorage.setItem(clefProduitModifie, nouvelleQuantite);
        var nombreTotalElement = document.querySelector("#totalQuantity");
        nombreTotalElement.innerText = total.Produits; 
        var prixTotalPanier = document.querySelector("#totalPrice");
        prixTotalPanier.innerText = total.Prix;  
      }
    });
  } 
  return total; 
}
/**
 * Suppression d un produit
 * @param { Object } total : nombreTotalProduits,prixTotal
 */
function suppression(total) { 
  const tousLesProduits = document.querySelectorAll(".deleteItem");
  for (let div of tousLesProduits) {    
    div.addEventListener("click", function () {  
      // recherche de l identifiant du produit grace à data-id
      let clefProduitSupprime = this.closest(".cart__item").dataset.id;
      let ancienneQuantite = Number(window.localStorage.getItem(clefProduitSupprime));
      let div_cart__item__content__settings__delete = div.parentNode;
      let div_cart__item__content__setting = div_cart__item__content__settings__delete.parentNode;
      let div_cart__item__content = div_cart__item__content__setting.parentNode;
      let div_cart__item__content__description = div_cart__item__content.firstElementChild;
      let p_price = div_cart__item__content__description.lastElementChild;
      let price = p_price.innerHTML.replace(' €','');  
      total.Produits += Number(0 - ancienneQuantite);
      total.Prix += Number(Number(0 - ancienneQuantite) * price);
      document.querySelector(".cart__item").innerHTML = '';
      window.localStorage.removeItem(clefProduitSupprime);
      var nombreTotalElement = document.querySelector("#totalQuantity");
      nombreTotalElement.innerText = total.Produits; 
      var prixTotalPanier = document.querySelector("#totalPrice");
      prixTotalPanier.innerText = total.Prix;  
    });
  } 
  return total; 
}

/**
 * envoi du formulaire avec l'API fetch methode post
 * envoi de { Object } contact : nom, prenom, adresse, ville, mail
 * envoi de { Array } produits : identifiants produits
 * retour de { String } un orderID
 */
function envoiFormulaire() { 
  const order = document.querySelector("#order");
  index = 0;
  console.log("order " + order);
  // Chargement de la liste des produits du panier (produits)
  let produits = [];
  while (localStorage.key(index) != null) {
  let clefProduit = localStorage.key(index);
  let mots = clefProduit.split('_');
  let _idProduct = mots[0];
  produits[index] = _idProduct;
  console.log("produits[" + index + "] " + produits[index]);
  index++; 
  }
  order.addEventListener("click", function(e) {
    e.preventDefault();
  // definition des controles sur les entrees du formulaire
  const nameRegExp = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/; // controle sur les noms
  const addressRegExp = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/; // controle sur l'adresse
  const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // controle sur l'adresse mail
  // verification du prenom 
      if (nameRegExp.test(document.getElementById("firstName").value) == false || 
      document.getElementById("firstName").value === null) {
        document.querySelector("#firstNameErrorMsg").innerHTML = "prenom invalide";
        validation = false;
      // verification du nom  
        }else if (nameRegExp.test(document.getElementById("lastName").value) == false ||
        document.getElementById("lastName").value === null) {
          document.querySelector("#lastNameErrorMsg").innerHTML = "nom invalide";
          validation = false;
          // verification de l adresse
        }else if (addressRegExp.test(document.getElementById("address").value) == false ||
        document.getElementById("address").value === null) {
          document.querySelector("#addressErrorMsg").innerHTML = "adresse invalide";
          validation = false;
          // verification de la ville
          }else if (nameRegExp.test(document.getElementById("city").value) == false || 
          document.getElementById("city").value === null) {
            document.querySelector("#cityErrorMsg").innerHTML = "ville invalide";
            validation = false;
            // verification de l adresse mail
          }else if (emailRegExp.test(document.getElementById("email").value) == false || 
          document.getElementById("email").value === null) {
            document.querySelector("#emailErrorMsg").innerHTML = "mail invalide";
            validation = false;
          }else{
            // suppression des messages d 'erreur
            document.querySelector("#firstNameErrorMsg").innerHTML = "";
            document.querySelector("#lastNameErrorMsg").innerHTML = "";
            document.querySelector("#addressErrorMsg").innerHTML = "";
            document.querySelector("#cityErrorMsg").innerHTML = "";
            document.querySelector("#emailErrorMsg").innerHTML = "";
            // validation du formulaire à true 
            validation = true; 
            // renseignement de l'objet contact
            var contact = {
              "firstName" : document.getElementById("firstName").value,
              "lastName" : document.getElementById("lastName").value,
              "address" : document.getElementById("address").value,
              "city" : document.getElementById("city").value,
              "email" : document.getElementById("email").value,
            }; 
      //  console.log("validation " + validation); 
      }; // fin if 
      alert("validation " + validation); 
      if (validation) {
  // concatenation du contact et des produits dans le corps du message
  const corpsMessage = { contact, produits };
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(corpsMessage),
    headers: {
      "Content-type": "application/json"
    }
    })
  .then((response) => response.json())
  .then((data) => {
      // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
      document.location.href = `confirmation.html?orderId=${data.orderId}`;
      alert ("data.orderId" + data.orderId);
  })
  .catch((err) => {
      console.log("Erreur Fetch product.js", err);
      alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
  });

}else{
  alert ("Formulaire invalide");
}
} );
}
