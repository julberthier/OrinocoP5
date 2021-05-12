// LOCAL STORAGE
//JSON.parse converti les données qui sont dans le localStorage en object JS. 
let pushProductInLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(pushProductInLocalStorage);

//On injecte le code HTML
const itemInCard = document.getElementById('centralpanier');

if (pushProductInLocalStorage === null) {
const emptyCard = ` <div>Votre panier est vide</div> `;
itemInCard.innerHTML = emptyCard;
}

// LE PANIER N'EST PAS VIDE ! On remplit le HTML ! 

else {
    let cardItemInside = [];

    // On recupere les informations ajoutées au LocalStorage et on remplit le HTML
    for (k=0; k < pushProductInLocalStorage.length; k++) {
    
        cardItemInside = cardItemInside + `
        <div class="row_item_card">
        <img src="${pushProductInLocalStorage[k].imageUrl}" alt="La photo de ${pushProductInLocalStorage[k].name}" id="img_grid_panier">
        <div class="item_name_grid">
        ${pushProductInLocalStorage[k].name}
          <span>
            Couleur: <span>${pushProductInLocalStorage[k].colors}</span> 
          </span>
          <span>${pushProductInLocalStorage[k].price + ',00 €'}</span>
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
        <span>${pushProductInLocalStorage[k].price + ',00 €'}</span>
        <i class="fas fa-trash-alt" id="trash_delete"></i>
      </div> 
     `;
    }  

    //On affiche l'objet ! 
        itemInCard.innerHTML = cardItemInside; 
}

// On calcul et affiche le montant du panier 
let totalCardPrice = [];

for (let p = 0; p < pushProductInLocalStorage.length; p++){
    let totalPrice = pushProductInLocalStorage[p].price;
    
    totalCardPrice.push(totalPrice)
}

// On fait l'addition 
const priceCalc = (accumulator, currentValue) => accumulator + currentValue;
const totalCalc = totalCardPrice.reduce(priceCalc, 0);
console.log(totalCalc)

// Et on remplit avec le total calculé dynamiquement ! 
const CalcTotalGrd = document.getElementById('item_price');
const affTotal = `${totalCalc + ',00 €'}`
CalcTotalGrd.innerHTML = affTotal;

const priceTotalPanier = document.getElementById('price_total_panier');
priceTotalPanier.innerHTML = affTotal;
