// CONST AND VAR
const showContainerProduit = document.getElementById('container_produit');

// AFFICHAGE FENETRE PANIER

const addedtocart = document.getElementById('addedtocart');
const close = document.getElementById('close');
let bears; 

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////

//API REQUEST
const fetchBears = async() => {
    bears = await fetch(
      'http://localhost:3000/api/teddies/').then(response => response.json());
      
  };
  
const showBears = async() => {
    await fetchBears();

  // On recupere la chaine de requete dans l'URL ! 
const queryString_url_id = window.location.search;

//On extrait l'ID de l'url ! 
const urlSearchParams = new URLSearchParams(queryString_url_id);
const onlyId = urlSearchParams.get("id");

// Recuperation du produit grâce à l'id present dans l'URL 
const idProductSelector = bears.find((e) => e._id === onlyId);

// On recupere le titre de la page pour le changer de maniere dynamique 
const pageProductTitle = document.querySelector("#product_page_title");

// On crée le HTML a rajouter ! 
const titleHtml = `La tannière de ${idProductSelector.name}`;

// On change le titre dynamiquement 
pageProductTitle.innerHTML = titleHtml;

// selection de la classe pour l'affichage 
const containerProductPage = document.getElementById("container_produit")

// HTML à injecter dans le code 
const htmlText = `
<a href="index.html" id="back_button_link"><i class="fas fa-chevron-circle-left"></i></a>

<img src="${idProductSelector.imageUrl}" alt="" id="img_produit" class="box_shadow"> 

<div id="background_card" class="box_shadow"> 
    <div class="list_items"> 
        <span class="price_list_items bold_items">${idProductSelector.name}</span> 
        <span id="desc_items">${idProductSelector.description}</span>
        <span class="price_list_items italic_items"><i class="fas fa-tags"></i> ${numberWithCommas(idProductSelector.price)}</span> 
        
        <div class="color_center_choice">
        <label for="color_choice" id="container_bg_items"> Choix de la couleur : </label>

<select name="colors" id="color_choice"> 

</select>
</div>

<div onclick='openShopModal()'>
<button id="shop_button" type="sumbit"> 
    <i class="fas fa-cart-plus"></i> Ajouter au panier 
</button> 
</div>
    </div> 
</div>
` ;

// Remplissage de la classe pour le choix des couleurs avec le code 
containerProductPage.innerHTML = htmlText;
let colorsItem = [];

// Definir les choix de couleurs 
const colorpeaker = idProductSelector.colors; 

// On récupere toutes les données des couleurs 
for (let j = 0; j < colorpeaker.length ; j++) {
    colorsItem = 
    colorsItem + 
    `<option style="background-color:${idProductSelector.colors[j]}; value="${idProductSelector.colors[j]}">${idProductSelector.colors[j]}</span>
    `
}

// On ajoute le choix ! 
const colorsChoice = document.getElementById("color_choice");
colorsChoice.innerHTML = colorsItem; 

//Bouton de validation du choix 
const boutonPanier = document.getElementById("shop_button");

boutonPanier.addEventListener("click", (event)=> {
    event.preventDefault();

// On recupere le choix de l'utilisateur pour la couleur
const userChoiceColor = colorsChoice.value;

// On crée un objet pour la recuperation des valeurs du formulaire pour envoi au panier 
let productChoice = {
    imageUrl: idProductSelector.imageUrl,
    name: idProductSelector.name,
    price: idProductSelector.price/100,
    colors: userChoiceColor,
    id: onlyId
}

// On ouvre la fenetre de panier 
function openShopModal() {
    document.getElementById('addedtocart').style.display = "block";
    blurBg.style.display = "block"
    blurBg.style.zIndex = "0";   
}

const blurBg = document.getElementById('blur_bg');


// ON REMPLIT LA FENETRE PANIER
const itemImportInWind = document.getElementById('main_box_fenetre');

const itemChoiceInWind = `
<img src="${idProductSelector.imageUrl}" alt="La photo de ${idProductSelector.name}" id="img_prod_wind">
            <div><strong>${idProductSelector.name}</strong></div>
            <div>COULEUR: <span><strong>${userChoiceColor}</strong></span></div>
            <div>PRIX: <span><strong>${idProductSelector.price/100 + ',00€'}</strong></span></div>          
`;

itemImportInWind.innerHTML = itemChoiceInWind;

//CLOSE BUTTON FENETRE PANIER 
close.addEventListener('click', function() {
    addedtocart.style.display = "none";
    blurBg.style.display = "none"
});

// L'utilisateur continue les achats 
function buyMore() {
    document.getElementById('addedtocart').style.display = "none";
}

// LOCAL STORAGE
//JSON.parse converti les données qui sont dans le localStorage en object JS. 
let pushProductInLocalStorage = JSON.parse(localStorage.getItem("produit"));


// AJOUTER UN PRODUIT AU LOCAL STORAGE 
const addProductToLocalStorage = () => {
    pushProductInLocalStorage.push(productChoice);
    localStorage.setItem("produit", JSON.stringify(pushProductInLocalStorage));
}

// 1+ Product 
if (pushProductInLocalStorage) {
    addProductToLocalStorage ();
    openShopModal ();

}

// 0 product
else {
    pushProductInLocalStorage = [];
    addProductToLocalStorage ();
    openShopModal ();
}

});
};

// On affiche le tout ! 
showBears();

// On rajoute une virgule et le signe € pour tous les prix ! 
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ' €';
}







