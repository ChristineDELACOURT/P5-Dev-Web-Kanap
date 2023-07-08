
var url = new URL(window.location.href);
if(url.searchParams.has('_id')) {
  var _iditem = url.searchParams.get('_id');
  console.log("_iditem tr= " + _iditem);

async function genereritem(_iditem) {
  const products = await fetch("http://localhost:3000/api/products").then(products => products.json());
  console.log("products " + products);
  console.log("products.length " + products.length);
  for (let i = 0; i < products.length; i++) {
    console.log("_iditem " + _iditem);
    console.log("i " + i);
    console.log("products " + products[i]);
    if (products[i]._id === _iditem) {
      console.log("_iditem " + _iditem);
      console.log("i " + i);
      console.log("products " + products[i]);
      // Récupération de l'élément du DOM qui accueillera l item
      const sectionImage = document.querySelector(".item__img");
      // Création de la balise image
      const imageElement = document.createElement("img");
      imageElement.src = products[i].imageUrl;
      imageElement.alt = products[i].altTxt;
      console.log("products[i].altTxt " + products[i].altTxt);
      // Récupération de l'élément du DOM qui accueillera le nom
      const nomCanape = document.querySelector("#title");
      // Renseignement du nom du canapé
      nomCanape.innerText = products[i].name;
      console.log("products[i].name " + products[i].name);
      // Récupération de l'élément du DOM qui accueillera le prix
      const prixCanape = document.querySelector("#price");
      // Renseignement du nom du canapé
      prixCanape.innerText = products[i].price;
      // Récupération de l'élément du DOM qui accueillera la description
      const descriptionCanape = document.querySelector("#description");
      // Renseignement la description du canapé
      descriptionCanape.innerText = products[i].description ?? "Pas de description pour le moment.";
  
      for (let j = 0; j < products[i].colors.length; j++) {
        console.log("products[i].colors[j] " + products[i].colors[j]);
        // Récupération de l'élément du DOM qui accueillera les couleurs
      const nomCouleur = document.querySelector("#colors"); 
      // Création de la balise option
      const couleurElement = document.createElement("option");
      couleurElement.value = products[i].colors[j];
      couleurElement.innerText = products[i].colors[j];
      // On rattache les balises à leur parents
      nomCouleur.appendChild(couleurElement);
      }

      // On rattache les balises à leur parents
      sectionImage.appendChild(imageElement);
    }
  }
}
genereritem(_iditem);
}
