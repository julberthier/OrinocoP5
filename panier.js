// LOCAL STORAGE
const itemInCard = document.getElementById("centralpanier");

//JSON.parse converti les données qui sont dans le localStorage en objet JS.
let pushProductInLocalStorage = JSON.parse(localStorage.getItem("produit"));

function feedLocalStorage() {
	//Le local storage est vide !
	//On injecte le code HTML
	if (pushProductInLocalStorage === null) {
		const emptyCard = ` <div id="empty_card">Votre panier est vide</div> `;
		itemInCard.innerHTML = emptyCard;
		yourCardIsEmpty();
	}
	// LE PANIER N'EST PAS VIDE ! On remplit le HTML !
	else {
		feedHtmlLocal();
		deleteItems();
		getPrice();
		yourCardIsNotEmpty();
		localCheck();
		validationOk();
	}
}

function feedHtmlLocal() {
	let cardItemInside = [];

	// On recupere les informations ajoutées au LocalStorage et on remplit le HTML
	for (k = 0; k < pushProductInLocalStorage.length; k++) {
		cardItemInside =
			cardItemInside +
			`
		<div class="row_item_card" id="${pushProductInLocalStorage[k].id}">
			<img src="${pushProductInLocalStorage[k].imageUrl}" alt="La photo de ${
				pushProductInLocalStorage[k].name
			}" id="img_grid_panier">
			<div class="item_name_grid">
				${pushProductInLocalStorage[k].name}
				<span>
					Couleur: <span>${pushProductInLocalStorage[k].colors}</span> 
				</span>
				<span>${pushProductInLocalStorage[k].price + ",00 €"}</span>
			</div>			
			<span>${pushProductInLocalStorage[k].price + ",00 €"}</span>
			<i class="fas fa-trash-alt trash_delete" data-id="${pushProductInLocalStorage[k].id}"></i>
  		</div> 
 	`;
	}

	//On affiche l'objet !
	itemInCard.innerHTML = cardItemInside;
}

feedLocalStorage();

//On efface un objet du localStorage

function deleteItems() {
	//On delete 1 item du panier
	document
		.querySelectorAll(".trash_delete").forEach(element => {		
			element.addEventListener("click", function (event) {
				let teddies = JSON.parse(window.localStorage.getItem("produit"));
				let id = event.target.getAttribute("data-id");
				var filtered = teddies.filter(function(value, index, arr){ 
					return value.id != id;
				});
				window.localStorage.setItem("produit", JSON.stringify(filtered));	
				let elt = document.getElementById(id).remove();
				window.location.reload();

				let newTotalCardPrice = [];
				for (let p = 0; p < filtered.length; p++) {
				let newTotalPrice = filtered[p].price;
				newTotalCardPrice.push(newTotalPrice);
				}	

				const priceCalc = (accumulator, currentValue) => accumulator + currentValue;
				const newTotalCalc = newTotalCardPrice.reduce(priceCalc, 0);
				document.getElementById("item_price").innerHTML = `${newTotalCalc + ",00 €"}`;
				document.getElementById("price_total_panier").innerHTML = `${newTotalCalc + ",00 €"}`;				
			});				
		});


	//On vide entierement le localStorage
	document.querySelector("#delete_card").addEventListener("click", function () {
		window.localStorage.clear();
		window.location.reload();
	});
}

function localCheck() {
	if (pushProductInLocalStorage.length === 0) {
		window.localStorage.clear();
		window.location.reload();
	}
};

// ON RECUPERER LES PRIX DES OURS POUR LES AFFICHER //


function getPrice() {
	// On calcul et affiche le montant du panier
	let totalCardPrice = [];
	for (let p = 0; p < pushProductInLocalStorage.length; p++) {
		let totalPrice = pushProductInLocalStorage[p].price;
		totalCardPrice.push(totalPrice);
	}
		// On fait l'addition
		const priceCalc = (accumulator, currentValue) => accumulator + currentValue;
		const totalCalc = totalCardPrice.reduce(priceCalc, 0);
	
		// Et on remplit avec le total calculé dynamiquement !
		document.getElementById("item_price").innerHTML = `${totalCalc + ",00 €"}`;
		document.getElementById("price_total_panier").innerHTML = `${totalCalc + ",00 €"}`;
}

const blurBg = document.getElementById("blur_bg");

/* LE PANIER EST VIDE POP UP */

function yourCardIsEmpty() {
	const btnSend = document.querySelector("#send_command");
	const popEmpty = document.getElementById("empty_popup");

	btnSend.addEventListener("click", function (event) {
		event.preventDefault();
		popEmpty.style.visibility = "visible";
		blurBg.style.display = "block";
		blurBg.style.zIndex = "0";
	});

	popEmpty.addEventListener("mouseout", function (event) {
		event.preventDefault();
		popEmpty.style.visibility = "hidden";
		blurBg.style.display = "none";
	});
}

/* LE PANIER N'EST PAS VIDE, FORMULAIRE DE COMMANDE ! */

const openHideBoxConf = document.getElementById("hide_conf_box");

function yourCardIsNotEmpty() {
	const btnSend = document.querySelector("#send_command");

	btnSend.addEventListener("click", function () {
		openHideBoxConf.style.visibility = "visible";
		blurBg.style.display = "block";
		blurBg.style.zIndex = "0";
	});
}

document.getElementById("close").addEventListener("click", function () {
	openHideBoxConf.style.display = "none";
	blurBg.style.display = "none";
	window.location.reload();
});

/* ENVOI DU FORMULAIRE DANS LE LOCALSTORAGE */

let idOrderConf = Date.now()

function validationOk() {
	document
		.getElementById("validateConf")
		.addEventListener("click", function () {
			const formValue = {
				orderId: idOrderConf,
				lastName: document.getElementById("name").value,
				firstName: document.getElementById("firstname").value,
				adress: document.getElementById("adress").value,
				city: document.getElementById("city").value,
				mail: document.getElementById("mail").value,
			};
			localStorage.setItem("formValue", JSON.stringify(formValue));

			const sendForShip = {
				formValue,
				pushProductInLocalStorage,
			};

			fetch("http://localhost:3000/api/teddies/order", {
				method: "POST",
				body: JSON.stringify(sendForShip),
			})
				.then((response) => response.json())
				.then((json) => console.log(json));
		});
}
