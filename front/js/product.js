main();
// fonction principale
async function main()
{
  // recuperation de l identifiant produit dans l URL
  var url = new URL(window.location.href);
  let _idProduct = 0;
  if(url.searchParams.has('_id')) {
    _idProduct = url.searchParams.get('_id');
  }
  // recuperation et affichage des attributs du produit
  var product = await getProduct(_idProduct);
  affichageHtml(product);
  addToCart(_idProduct);
}

/**
 * Recuperation du produit (canapé) en utilisant l'API fetch
 * @param { String } _idProduct : identifiant du produit
 */
async function getProduct(_idProduct)
{
  const response = await fetch("http://localhost:3000/api/products/" + _idProduct);
  const product = response.json();
  return product;
}

/**
 * Recuperation du produit (canapé) 
 * @param { Object } product : attributs du produit
 */
function affichageHtml(product)
{
  // Récupération de l'élément du DOM qui accueillera le produit
  const sectionImage = document.querySelector(".item__img");
  // Création de la balise image
  const imageElement = document.createElement("img");
  imageElement.src = product.imageUrl;
  imageElement.alt = product.altTxt;
  // Récupération de l'élément du DOM qui accueillera le nom
  const nomCanape = document.querySelector("#title");
  // Renseignement du nom du canapé
  nomCanape.innerText = product.name;
  // Récupération de l'élément du DOM qui accueillera le prix
  const prixCanape = document.querySelector("#price");
  // Renseignement du prix du canapé
  prixCanape.innerText = product.price;
  // Récupération de l'élément du DOM qui accueillera la description
  const descriptionCanape = document.querySelector("#description");
  // Renseignement la description du canapé
  descriptionCanape.innerText = product.description ?? "Pas de description pour le moment.";

  for (let j = 0; j < product.colors.length; j++) {
    // Récupération de l'élément du DOM qui accueillera les couleurs
    const nomCouleur = document.querySelector("#colors"); 
    // Création de la balise option
    const couleurElement = document.createElement("option");
    couleurElement.value = product.colors[j];
    couleurElement.innerText = product.colors[j];
    // On rattache les balises à leur parents
    nomCouleur.appendChild(couleurElement);
  }
  // On rattache les balises à leur parents
  sectionImage.appendChild(imageElement);
  return product;
}

/**
 * Ajout du produit au panier (localStorage)
 * @param { String } _idProduct : identifiant du produit
 */ 
function addToCart(_idProduct) {
  const boutonAddToCart = document.querySelector("#addToCart");
  boutonAddToCart.addEventListener("click", function () {
    // IMPORTANT : la clef du produit dans le panier 
    // est la concaténation de l'identifiant et de la couleur
    const clefProduit = (_idProduct + "_" + document.querySelector("#colors").value);
    var quantiteProduit = Number(document.querySelector("#quantity").value);
    var quantiteStockee = Number(window.localStorage.getItem(clefProduit));

    if (quantiteStockee !== null){
      // Mise à jour de la quantité
      window.localStorage.removeItem(clefProduit);
      alert(quantiteProduit + " produit(s) ajouté(s) au panier"); 
      quantiteProduit += quantiteStockee; 
    }
  window.localStorage.setItem(clefProduit, quantiteProduit);
  });
}
