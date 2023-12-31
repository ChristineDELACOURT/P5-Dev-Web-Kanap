/**
 * Recuperation des produits (canapés) en utilisant l'API fetch
 */
async function getProducts() {
  const products = await fetch("http://localhost:3000/api/products").then(products => products.json());
  for (let i = 0; i < products.length; i++) {
      // Récupération de l'élément du DOM qui accueillera les produits
      const sectionItems = document.querySelector(".items");
      // Création des balises relatives à un canapé
      const lienElement = document.createElement("a");  
      lienElement.href = ("product.html?_id=" + products[i]._id);
      const itemElement = document.createElement("article");  
      const imageElement = document.createElement("img");
      imageElement.src = products[i].imageUrl;
      imageElement.alt = products[i].altTxt;
      const nomElement = document.createElement("h3");
      nomElement.className = "productName";
      nomElement.innerText = products[i].name;
      const descriptionElement = document.createElement("p");
      descriptionElement.className = "productDescription";
      descriptionElement.innerText = products[i].description ?? "Pas de description pour le moment.";
      
      // On rattache les balises à leur parents
      sectionItems.appendChild(lienElement);
      lienElement.appendChild(itemElement);
      itemElement.appendChild(imageElement);
      itemElement.appendChild(nomElement);
      itemElement.appendChild(descriptionElement);

  }
}
getProducts();
