"use strict";


console.log("Hello Fetch API");

// Program State
const GIPHY_URL = "https://api.giphy.com/v1/gifs/translate";
const GIPHY_KEY = "cZAoi8H6PDtfSl2a5GPHeWTobfkm6Mai";


let savedGifs = [];


// Select Elements 
let feedbackEle = document.querySelector("#feedback");
let searchInput = document.querySelector("#searchWord");
let searchBtn = document.querySelector("#submitSearch");
let inputContainer = document.querySelector("#inputContainer");
let gifEle = document.querySelector("#imageContainer > img");
let imageContainer = document.querySelector("#imageContainer")
let saveBtn = document.querySelector("#saveBtn");
let savedGifsContainer = document.querySelector("#savedGifs");



// Event Handlers 
inputContainer.addEventListener("submit", (event) => {
    event.preventDefault();

    getGif(searchInput.value);
});

saveBtn.addEventListener("click", (event) => {
    // save the current gif
    savedGifs.push({ src: gifEle.src, 
        alt: gifEle.alt, 
        id: gifEle.getAttribute("data-id"),
    });

    // add the new saved gif to the saved gif container
    let newGif = document.createElement("img")
    newGif.src = gifEle.src;
    newGif.alt = gifEle.alt;
    newGif.id = gifEle.getAttribute("data-id");
    savedGifsContainer.prepend(newGif);
});

    





// function getGif(searchTerm) {
   // fetch(`$GIPHY_URL}?api_key=${GIPHY_KEY}&s={searchTerm}`) 
   // .then ((res) => res.json())
   // .then((body) => {
       //show the gif on the DOM
//      gifEle.src = body.data.images.original.url;
//  })
//      .catch((err) => {
 //     console.error(err);
 // show the error message on the DOM 
 //     feedbackEle.textContent = err.message;
 // });
 // }   


 async function getGif (searchTerm) {
    try {
        let res = await fetch(`${GIPHY_URL}?api_key=${GIPHY_KEY}&s=${searchTerm}`);
        let body = await res.json();

        console.log(body);

         if (body.data instanceof Array && body.data.length == 0) {
             throw new Error(`No results for "${searchTerm}"`);
         }

         // hide feedback 

         feedbackEle.textContent = ""; 

        // show the gif on the DOM 
        gifEle.src = body.data.images.original.url;
        // update the alt value
        gifEle.alt = body.data.title;
        //update the data-id 
        gifEle.setAttribute("data-id", body.data.id);
        // display the image container
        imageContainer.classList.remove("hidden");
    } catch (err){
        console.error(err);
        // show the error message in the DOM 
        feedbackEle.textContent = err.message;
        //hide the image container 
        imageContainer.classList.add("hidden");
    }
 }
 









