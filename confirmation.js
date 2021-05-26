let pushProductInLocalStorage = JSON.parse(localStorage.getItem("produit"));

getPrice();
clearLocalStorage ();

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
	document.getElementById("final_price_cart").innerHTML = `<strong>${totalCalc + ",00 €"}</strong>`;	
};

function clearLocalStorage () {
const clearLocal = document.getElementById('back_button_link');
const alsoClearLocal = document.getElementById('home');

	clearLocal.addEventListener("click", function(){		
		window.localStorage.clear();
	})

	alsoClearLocal.addEventListener("click", function(){		
		window.localStorage.clear();
	})
}

// function commandId() {

// 	document.getElementById("command_id").innerHTML = `<strong>${}</strong> `
// };

