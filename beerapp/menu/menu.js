const showMenu = (headerToggle, navbarId) =>{
    const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
    
    // Validate that variables exist
    if(headerToggle && navbarId){
        toggleBtn.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
            // change icon
            toggleBtn.classList.toggle('bx-x')
        })
    }
}
showMenu('header-toggle','navbar')

/*==================== LINK ACTIVE ====================*/
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    linkColor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}

linkColor.forEach(l => l.addEventListener('click', colorLink))



// ============== FETCH API BEER DATA ===========================
const beerList = document.querySelector('#beerList');
const searchInputAll = document.querySelector('#searchInput');
const perPageSelect = document.querySelector('#perPageSelect');
const previousPage = document.querySelector('#previousBtn');
const nextPage = document.querySelector('#nextBtn');
const abvGreater = document.querySelector('#abvGreater');
const abvLess = document.querySelector('#abvLess');
const beforeYear = document.querySelector('#beforeYear');
    
let pageNumber = 1;


// ======= EVENTS ==========
searchInputAll.addEventListener('input', () => {
    fetchData(1)
 });

// Event listeners for checkboxes
abvGreater.addEventListener('change', () => {
    fetchData(1); // Assuming you always want to start from the first page
});

abvLess.addEventListener('change', () => {
    fetchData(1);
});

beforeYear.addEventListener('change', () => {
    fetchData(1);
});

// next and previous buttons
previousPage.addEventListener('click',() => {
    pageNumber--;
    fetchData(pageNumber)
})
nextPage.addEventListener('click',()=>{
    pageNumber++;
    fetchData(pageNumber)
})

// Event listener for perPageSelect change
perPageSelect.addEventListener('change', function() {
   let perPage = perPageSelect.value;
   fetchData(pageNumber, perPage);
});


// =================== FUNCTIONS =====================

// Function to handle changing pages,per page, checkbox category, search bar
function fetchData(pageNumber,perPage) {
    const searchQuery = searchInputAll.value.toLowerCase();  
    perPage = perPageSelect.value;

 // Get the checked status of checkboxes
    const abvGreater = document.querySelector('#abvGreater').checked;
    const abvLess = document.querySelector('#abvLess').checked;
    const beforeYear = document.querySelector('#beforeYear').checked;
   
    
 // Construct the API URL with pagination parameters
    let apiUrl = `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=${perPage}`;

 // Modify apiUrl based on checkbox status
    if (abvGreater) {
         apiUrl += '&abv_gt=6'; 
    }
    if (abvLess) {
         apiUrl += '&abv_lt=6';
    }
    if (beforeYear) {
         apiUrl += '&brewed_before=12-2012';
    }

 fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Ensure data is an array before proceeding
            if (!Array.isArray(data)) {
                console.error('Data is not an array:', data);
                return;
            }
            const filteredData = data.filter(beer => beer.name.toLowerCase().includes(searchQuery)); 
            beerList.innerHTML = '';
            filteredData.forEach(beer => {
                renderBeer(beer);
            });

            // show/hide pagination buttons based on page number
            if (pageNumber === 1) {
                previousPage.style.display = 'none';
            } else {
                previousPage.style.display = 'block';
            }

            if (data.length <= pageNumber) {
                nextPage.style.display = 'none';
            } else {
                nextPage.style.display = 'block';
            }
        })
        .catch(error => console.error('Error fetching beers:', error));  
}

fetchData(1, 25); // show first page with 25 elements per page


// Function render a signle beer item
function renderBeer(beer){
    const beerItem = document.createElement('div');
    beerItem.classList.add('item');

    if(!beer.image_url){
        beerItem.innerHTML = `<img src="src/img/beer.png" alt="beer-img" class="beer-img-api-menu">
        <div class="item-css">
            <div class="content-item">Name:${beer.name}</div>
            <div class="content-item">ABV:  ${beer.abv}</div>
            <div class="content-item">Food:${beer.food_pairing.join(', ')}</div>
        </div
        `;
    }else{
        beerItem.innerHTML = `
     <img src="${beer.image_url}" alt="Beer Image" class="beer-img-api-menu">
         <div class="item-css">
            <div class="content-item"><span class="strong">Name: </span>${beer.name}</div>
            <div class="content-item"><span class="strong">ABV: </span>  ${beer.abv}</div>
            <div class="content-item"><span class="strong">Food: </span>${beer.food_pairing.join(', ')}</div>
        </div
    // `;
    }

    beerList.appendChild(beerItem)
}
