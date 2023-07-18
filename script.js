// we create an accessKey variable where we store our api key, this api is taken from unsplash.com
const accessKey = "2UfvhbZv3dlWq7AUgv6VeFZZqW3aIbj4wDaLJrPSudE";

// we create a form element variable where we store our form section
const formEl = document.querySelector("form")

// we create a input element variable where we store our the input section
const inputEl = document.getElementById("search-input")

// we create a search resuls where we select container images
const searchResults = document.querySelector(".search-results")

// we create a showMore variable where we store the value of show more button
const showMore = document.getElementById("show-more-button")

// we create a inputData where we store all the input data
let inputData = ""
let page = 1;

async function searchImages() {
    // in input data we store the input element value
    inputData = inputEl.value;
    
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // using url in response variable we fetch the url
    const response = await fetch(url);
    // then all the json data will be stored in data variable  
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result")

        const image = document.createElement('img');
        image.src = result.urls.small
        image.alt = result.alt_descrption

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    })

    page++;
    if (page > 1) {
        showMore.style.display = "block"
    }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault()
    page = 1;
    searchImages()
})

showMore.addEventListener("click", (event)=>{
    searchImages()
})