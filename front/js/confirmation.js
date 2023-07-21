//recuperation du numero de commande dans l'URL
let url = new URL(location.href);
if(url.searchParams.has('orderId')) {
orderId = url.searchParams.get('orderId');
}
// Affichage du numero de commande dans la page de confirmation
const champsOrderId = document.getElementById("orderId");
champsOrderId.innerHTML = `${orderId}`;

// On vide le panier 
localStorage.clear();