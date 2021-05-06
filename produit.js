/* AFFICHAGE FENETRE PANIER */ 

const addedtocart = document.getElementById('addedtocart');
const close = document.getElementById('close');


/* CLOSE BUTTON FENETRE PANIER */
close.addEventListener('click', function() {
    addedtocart.classList.add('close');
});