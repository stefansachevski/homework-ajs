const url = 'https://swapi.dev/api/';
let peopleUrl = `${url}people/?page=1`;
let shipsUrl = `${url}starships/?page=1`;

const peopleBtn = document.querySelector('#peopleBtn');
const shipsBtn = document.querySelector('#shipsBtn');
const result = document.querySelector('#result-2');
const resultShips = document.querySelector('#result-3')
const tableShips = document.querySelector('#result-ships')
const resultPeople = document.querySelector('#result')
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const spinner = document.getElementById("loader");
const shipsNextBtn = document.querySelector('#nextBtn-ships');
const shipsPrevBtn = document.querySelector('#prevBtn-ships')
let pageNumber = 1;
let shipsNumber = 1

//loader
function toggleSpinner(showSpinner){
    if(showSpinner){
        spinner.style.display = "block"
    } else{
        spinner.style.display = "none"
    }
}

//function fetching people from api
async function getAllPosts(pageNumber) {
    const response = await fetch(`https://swapi.dev/api/people/?page=${pageNumber}`);
    const data = await response.json();
    let person = data.results;

    shipsNextBtn.style.display = "none"
    shipsPrevBtn.style.display = "none"
       

    result.innerHTML ="";
        
    for (let i = 0; i < 10; i++) {
        
    let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="row white padding">
 				<div class="col">${person[i].name}</div>
 				<div class="col">${person[i].height}</div>
 				<div class="col">${person[i].mass}</div>
 				<div class="col">${person[i].gender}</div>
 				<div class="col">${person[i].birth_year}</div>
 				<div class="col" style="font-size: 5px" >${person[i].films}</div>
 			</div>
         `;

         result.appendChild(newDiv)
      }

    if (pageNumber === 1) {
        prevBtn.style.display = "none";
    } else{
        prevBtn.style.display = "block";
    }

    nextBtn.style.display = "block";
}


//function fetching ships from api
async function getShipsApi(shipsNumber) {
    const response = await fetch(`https://swapi.dev/api/starships/?page=${shipsNumber}`);
    const data = await response.json();
    let ships = data.results;

    nextBtn.style.display = "none";
    prevBtn.style.display = "none";


    resultShips.innerHTML ="";
    
  for (let i = 0; i < 10; i++) {
    
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <div class="row white padding">
             <div class="col">${ships[i].name}</div>
             <div class="col">${ships[i].model}</div>
             <div class="col">${ships[i].manufacturer}</div>
             <div class="col">${ships[i].cost_in_credits}</div>
             <div class="col">${ships[i].cargo_capacity}</div>
             <div class="col">${ships[i].starship_class}</div>
         </div>
     `;

     resultShips.appendChild(newDiv)
  }

if (shipsNumber === 1) {
    shipsPrevBtn.style.display = "none";
} else{
    shipsPrevBtn.style.display = "block";
}

shipsNextBtn.style.display = "block";
}

// EVENTS

//People button event
peopleBtn.addEventListener('click', ()=>{
    result.style.display = "block";
    resultPeople.style.display="block"
    tableShips.style.display = "none";
    getAllPosts(1)
})

// next button for people api
nextBtn.addEventListener('click', () => {
    pageNumber++;
    getAllPosts(pageNumber)
    .finally(() => toggleSpinner(false));
    if(pageNumber === 9){
        nextBtn.style.display = "none";
    }   
   
})

// previous button for people api
prevBtn.addEventListener('click', ()=>{
    pageNumber--;
    getAllPosts(pageNumber)
    .finally(() => toggleSpinner(false));
})

// Ships button event

shipsBtn.addEventListener('click', ()=>{
    result.style.display = "block";
    resultPeople.style.display = "none";   
    tableShips.style.display = "block";
    getShipsApi(1)
})

// ship next button event
shipsNextBtn.addEventListener('click',()=>{
    shipsNumber++;
    shipsPrevBtn.style.display = "block";
    getShipsApi(shipsNumber)
    if(shipsNumber === 4){
        shipsNextBtn.style.display = "none";
    }

})

// ship previous button event
shipsPrevBtn.addEventListener('click',()=>{
    shipsNumber--;
    getShipsApi(shipsNumber)
})