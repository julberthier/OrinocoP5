// CONST AND VAR
const showContainer = document.getElementById("show_container");

//API REQUEST
fetch("http://localhost:3000/api/teddies")
	.then((response) => response.json())
	.then((bears) => {
		showContainer.innerHTML = bears

			.map(
				(bear) =>
					`<div class="container_card box_shadow margin_t"> 
              <a href="produit.html?id=${bear._id}"><img src="${
						bear.imageUrl
					}" alt="photo de l'ourson" class="teddy_img"></a> 
              <div class="price_container"> 
                  <div class="list_items flex_column"> 
                    <h2 class="price_list_items bold_items">${bear.name}</h2> 
                    <span><span class="price_list_items italic_items"><i class="fas fa-tags"></i> ${numberWithCommas(
											bear.price
										)} </span></span>
                    <span class="price_list_items price_items"><a href="produit.html?id=${
											bear._id
										}">Voir le produit</a></span></div></div></div>`
			)
			.join();
	})
	.catch((err) => console.log(err));

// On rajoute une virgule et le signe € pour tous les prix !
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",") + " €";
}

// LOCAL STORAGE
//JSON.parse converti les données qui sont dans le localStorage en object JS.
let pushProductInLocalStorage = JSON.parse(localStorage.getItem("produit"));

//On injecte le code HTML
const redbubble = document.getElementById("red_o");
const itemInPostCard = document.getElementById("dd_cart_content");

if (pushProductInLocalStorage === null) {
	const emptyCard = `<div>Votre panier est vide</div>`;
	itemInPostCard.innerHTML = emptyCard;
} else {
	let cardItemPostInside = [];

	for (k = 0; k < pushProductInLocalStorage.length; k++) {
		cardItemPostInside =
			cardItemPostInside +
			`
        <div class="row_item_card">
        <img src="${pushProductInLocalStorage[k].imageUrl}" alt="La photo de ${pushProductInLocalStorage[k].name}" id="img_grid_panier">
        <div class="item_name_grid">
        ${pushProductInLocalStorage[k].name}
          <span>
            Couleur: <span>${pushProductInLocalStorage[k].colors}</span> 
          </span>
          <span>${pushProductInLocalStorage[k].price}, 00€</span>
        </div>        
        <span>${pushProductInLocalStorage[k].price}, 00€</span>
        <i class="fas fa-trash-alt" id="trash_delete"></i>
      </div> 
     `;

		redbubble.style.display = "block";
		itemInPostCard.innerHTML = cardItemPostInside;
	}
}
