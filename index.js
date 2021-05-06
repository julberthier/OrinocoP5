// CONST AND VAR
const showContainer = document.getElementById('show_container');

let bears;

//API REQUEST

const fetchBears = async() => {
  bears = await fetch(
    'http://localhost:3000/api/teddies').then(response => response.json());
};

const showBears = async() => {
  await fetchBears();

  showContainer.innerHTML = ( 
    
    bears    
    
    .map(bear => (

        `        
      <div class="container_card box_shadow margin_t"> 
            <a href="produit.html"><img src="${bear.imageUrl}" alt="photo de l'ourson" class="teddy_img"></a> 
            <div class="price_container"> 
                <div class="list_items"> 
                  <h2 class="price_list_items bold_items">${bear.name}</h2> 
                  <span><span class="price_list_items italic_items"> ${ numberWithCommas(bear.price)} </span></span>
                  <span class="price_list_items price_items"><a href="produit.html">Voir le produit</a></span></div></div>
                  </div>
      `
    )).join('')
  );
};

showBears();

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ' €';
}
