// CONST AND VAR
const showContainerProduit = document.getElementById("container_produit");

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////

//API REQUEST
//On extrait l'ID de l'url !
const urlSearchParams = new URLSearchParams(window.location.search);

// Recuperation du produit grâce à l'id present dans l'URL
const idProductSelector = urlSearchParams.get("id");

fetch(`http://localhost:3000/api/teddies/${idProductSelector}`)
	.then((response) => response.json())
	.then((data) => {
		displayBearsInfos(data);

		//Bouton de validation du choix
		const boutonPanier = document.getElementById("shop_button");
		boutonPanier.addEventListener("click", (event) => {
			event.preventDefault();
			addToCart(data);
		});
	});

function displayBearsInfos(bear) {
	// On recupere le titre de la page pour le changer de maniere dynamique
	document.querySelector(
		"#product_page_title"
	).innerHTML = `La tannière de ${bear.name}`;

	// HTML à injecter dans le code
	document.getElementById(
		"container_produit"
	).innerHTML = `<a href="index.html" id="back_button_link"><i class="fas fa-chevron-circle-left"></i></a>
  
  	<img src="${bear.imageUrl}" alt="" id="img_produit" class="box_shadow"> 
  
  	<div id="background_card" class="box_shadow"> 
        <div class="list_items flex_column"> 
          <span class="price_list_items bold_items">${bear.name}</span> 
          <span id="desc_items">${bear.description}</span>
          <span class="price_list_items italic_items"><i class="fas fa-tags"></i> ${numberWithCommas(
						bear.price
					)}</span>           
          <div class="color_center_choice">
          <label for="color_choice" id="container_bg_items"> Choix de la couleur : </label>  
          <select name="colors" id="color_choice"> ${colorChoicePeaker(
						bear.colors
					)}</select>
        </div>  
  
  	<button id="shop_button" type="sumbit"> 
      <i class="fas fa-cart-plus"></i> Ajouter au panier 
 	 </button> 

      </div> 
  	</div>
  	`;
};

// On rajoute une virgule et le signe € pour tous les prix !
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",") + " €";
};

// On récupere toutes les données des couleurs
function colorChoicePeaker(colors) {
	let colorItems = [];
	colors.forEach((element) => {
		colorItems.push(
			`<option style="background-color:${element}; value="${element}">${element}</span>`
		);
	});	
	return colorItems.join(" ");
};

const blurBg = document.getElementById("blur_bg");

// On ouvre la fenetre de panier
function openShopModal() {
	document.getElementById("addedtocart").style.display = "block";
	blurBg.style.display = "block";
	blurBg.style.zIndex = "0";	

	const addedtocart = document.getElementById("addedtocart");

	document.getElementById("close").addEventListener("click", function () {
		addedtocart.style.display = "none";
		blurBg.style.display = "none";
	});

	// L'utilisateur continue les achats
	document.querySelector("#button_keep").addEventListener("click", function () {
		document.getElementById("addedtocart").style.display = "none";
		blurBg.style.display = "none";
		window.location = "index.html";
	});

	document.getElementById('button_cart').addEventListener("click", function() {
		window.location = "panier.html";
	})
};

function addToCart(bear) {
	// On crée un objet pour la recuperation des valeurs du formulaire pour envoi au panier
	let productChoice = {
		imageUrl: bear.imageUrl,
		name: bear.name,
		price: bear.price / 100,
		id: urlSearchParams.get("id")
	};

	// ON REMPLIT LA FENETRE PANIER
	document.getElementById("main_box_fenetre").innerHTML = `
            <img src="${bear.imageUrl}" alt="La photo de ${bear.name}" id="img_prod_wind">
            <div><strong>${bear.name}</strong></div>
            <div>COULEUR: <span><strong>couleur</strong></span></div>
            <div>PRIX: <span><strong>${bear.price / 100 + ",00€"}</strong></span></div>          
`;	
	// LOCAL STORAGE
	//JSON.parse converti les données qui sont dans le localStorage en object JS.
	let pushProductInLocalStorage = JSON.parse(localStorage.getItem("produit"));

	// AJOUTER UN PRODUIT AU LOCAL STORAGE
function addProductToLocalStorage() {
		pushProductInLocalStorage.push(productChoice);
		localStorage.setItem("produit", JSON.stringify(pushProductInLocalStorage));	
	};

	// 1+ Product
	if (pushProductInLocalStorage) {
		addProductToLocalStorage();
		openShopModal();		
	}

	// 0 product
	else {
		pushProductInLocalStorage = [];
		addProductToLocalStorage();
		openShopModal();
	}
};