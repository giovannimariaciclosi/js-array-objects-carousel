/*
Consegna:
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

*/


const images = [
  {
      image: 'img/01.webp',
      title: 'Marvel\'s Spiderman Miles Morale',
      text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
  }, {
      image: 'img/02.webp',
      title: 'Ratchet & Clank: Rift Apart',
      text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  }, {
      image: 'img/03.webp',
      title: 'Fortnite',
      text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  }, {
      image: 'img/04.webp',
      title: 'Stray',
      text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  }, {
      image: 'img/05.webp',
      title: "Marvel's Avengers",
      text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
  }
]

// console.log(images);


//prendo gli elementi html
const upArrowElement = document.getElementById("up-arrow");
const downArrowElement = document.getElementById("down-arrow");
const activeImgElement = document.getElementById("carousel-active-img");
const carouselThumbnailsElement = document.getElementById("carousel-thumbnails");
const carouselTitleElement = document.getElementById("carousel-title");
const carouselTextElement = document.getElementById("carousel-text");


//memorizzo una variabile di indice
let index = 0;

//inizio inserendo dentro il parametro src la proprietà image degli oggetti
activeImgElement.src = images[index].image;

//creo n miniature di immagine in base alla dimensione dell'array
images.forEach((immagineAttuale, indiceAttuale) => {

  let newThumbnail = document.createElement('img');

  // appendo le immagini a #carousel-thumbnails
  carouselThumbnailsElement.append(newThumbnail);

  // cambio il parametro src in modo che contenga il path dell'immagine relativa
  newThumbnail.src = immagineAttuale.image;

  // aggiungo la classe thumbnail
  newThumbnail.classList.add("thumbnail");

  // aggiungo l'attributo alt
  newThumbnail.alt = "thumbnail picture";

  // attribuire lo stile in maniera dinamica
  //stilizzo l'altezza di ciascuna con la formula calc(100% / numero immagini)
  newThumbnail.style.height = `calc(100% / ${images.length})`;

  // cambio il testo dell'elemento html #carousel-title
  carouselTitleElement.innerText = images[index].title;
  // cambio il testo dell'elemento html #carousel-text
  carouselTextElement.innerText = images[index].text;
});



// prendo le immagini create dal documento usando il selettore con la classe che gli ho appena aggiunto
const thumbnailElements = document.querySelectorAll("#carousel-thumbnails .thumbnail");
// aggiungo la classe active alla prima immagine
thumbnailElements[index].classList.add("active");


//al click di downArrowElement
downArrowElement.addEventListener("click", () => {

  let scroll = scrollDown();

});

//al click di upArrowElement
upArrowElement.addEventListener("click", () => {

  let scroll = scrollUp();

});


// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

// chiamo la funzione scrollDown ogni 3 secondi
let countdown = setInterval(scrollDown, 3000);


//___________________________________________________________________________
//FUNZIONI

function scrollDown() {
    
// rimuovo la classe active dall'immagine con l'indice attuale (non ancora aumentato)
thumbnailElements[index].classList.remove("active");

//SE l'indice è lunghezza dell'array - 1
if(index == images.length - 1) {

  //cambio l'indice con lo 0
  index = 0;

} else {

  //aumento il valore dell'indice di un'unità
  index++;

}
// aggiungo la classe active all'immagine miniatura relativa alla posizione dell'indice
thumbnailElements[index].classList.add("active");

//mostro la proprietà immagine dell'ogggetto alla posizione dell'array relativa al valore dell'indice
activeImgElement.src = images[index].image;

// cambio il testo dell'elemento html #carousel-title in base al valore dell'indice
carouselTitleElement.innerText = images[index].title;
// cambio il testo dell'elemento html #carousel-text in base al valore dell'indice
carouselTextElement.innerText = images[index].text;

console.log(index);

}


function scrollUp() {

  // rimuovo la classe active dall'immagine con l'indice attuale (non ancora aumentato)
  thumbnailElements[index].classList.remove("active");

   //SE l'indice è 0
   if(index == 0) {

    //cambio l'indice con la lunghezza dell'array - 1
    index = images.length - 1;

  } else {

    //diminuisco il valore dell'indice di un'unità
    index--;

  }

  //aggiungo la classe active all'immagine miniatura relativa alla posizione dell'indice
  thumbnailElements[index].classList.add("active");

  //mostro la proprietà immagine dell'ogggetto alla posizione dell'array relativa al valore dell'indice
  activeImgElement.src = images[index].image;

  // cambio il testo dell'elemento html #carousel-title in base al valore dell'indice
  carouselTitleElement.innerText = images[index].title;
  // cambio il testo dell'elemento html #carousel-text in base al valore dell'indice
  carouselTextElement.innerText = images[index].text;

  console.log(index);

}