async function genererItems() {
  const products = await fetch("http://localhost:3000/api/products").then(products => products.json());
  console.log("products " + products);
  console.log("products.length " + products.length);
  for (let i = 0; i < products.length; i++) {
      console.log("i " + i);
      console.log("products " + products[i]);
      // Récupération de l'élément du DOM qui accueillera les items
      const sectionItems = document.querySelector(".items");
      // Création d'une balise dédiée au liyn d un canapé
      const lienElement = document.createElement("a");  
      lienElement.href = ("product.html?" + products[i]._id);
      // Création d'une balise dédiée à un canapé
      const itemElement = document.createElement("article");  
      // Création des balises 
      const imageElement = document.createElement("img");
      imageElement.src = products[i].imageUrl;
      imageElement.alt = products[i].altTxt;
      const nomElement = document.createElement("h3");
      nomElement.class = "productName";
      nomElement.innerText = products[i].name;
      const descriptionElement = document.createElement("p");
      descriptionElement.class = "productDescription";
      descriptionElement.innerText = products[i].description ?? "Pas de description pour le moment.";
      
      // On rattache les balises à leur parents
      sectionItems.appendChild(lienElement);
      lienElement.appendChild(itemElement);
      itemElement.appendChild(imageElement);
      itemElement.appendChild(nomElement);
      itemElement.appendChild(descriptionElement);
  }
}
genererItems();
