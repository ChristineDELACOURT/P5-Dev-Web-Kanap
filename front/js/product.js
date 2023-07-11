// Récupération de l'identifiant du produit
var url = new URL(window.location.href);
let _idProduct = 0;
if(url.searchParams.has('_id')) {
  _idProduct = url.searchParams.get('_id');
  console.log("_idProduct tr= " + _idProduct);
}

async function getProduct(_idProduct) {
  const product = await fetch("http://localhost:3000/api/products/" + _idProduct).then(product => product.json());
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
      // Renseignement du nom du canapé
      prixCanape.innerText = product.price;
      // Récupération de l'élément du DOM qui accueillera la description
      const descriptionCanape = document.querySelector("#description");
      // Renseignement la description du canapé
      descriptionCanape.innerText = product.description ?? "Pas de description pour le moment.";
  
      for (let j = 0; j < product.colors.length; j++) {
        console.log("product.colors[j] " + product.colors[j]);
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
}
getProduct(_idProduct);
