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
		<div class="row_item_card">
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
			<select name="" id="item_selector_list">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
			</select>
			<span>${pushProductInLocalStorage[k].price + ",00 €"}</span>
			<i class="fas fa-trash-alt" id="trash_delete"></i>
  		</div> 
 	`;
	}

	//On affiche l'objet !
	itemInCard.innerHTML = cardItemInside;
}

feedLocalStorage();

//On efface un object du localStorage
function deleteItems() {
	//On delete 1 item du panier
	document
		.getElementById("trash_delete")
		.addEventListener("click", function () {
			window.localStorage.removeItem("produit");
			window.location.reload();
		});

	//On vide entierement le localStorage
	document.querySelector("#delete_card").addEventListener("click", function () {
		window.localStorage.clear();
		window.location.reload();
	});
}

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
	document.getElementById("price_total_panier").innerHTML = `${
		totalCalc + ",00 €"
	}`;
}

const blurBg = document.getElementById("blur_bg");

function yourCardIsEmpty() {
	const btnSend = document.querySelector("#send_command");
	const popEmpty = document.querySelector(".pop_empty");

	btnSend.addEventListener("click", function (event) {
		event.preventDefault();
		popEmpty.style.visibility = "visible";
		blurBg.style.display = "block";
		blurBg.style.zIndex = "0";
	});

	btnSend.addEventListener("mouseout", function (event) {
		event.preventDefault();
		popEmpty.style.visibility = "hidden";
		blurBg.style.display = "none";
	});
}

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

function validationOk() {
	document
		.getElementById("validateConf")
		.addEventListener("click", function () {
			const formValue = {
				lastName: document.querySelector("#name").value,
				firstName: document.querySelector("#firstname").value,
				adress: document.querySelector("#adress").value,
				city: document.querySelector("#city").value,
				mail: document.querySelector("#mail").value,
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
			.then(response => response.json())
			.then(json => console.log(json));

		});
}
