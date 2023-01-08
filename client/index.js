const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsList = document.querySelector('#results')

const BASE_URL = 'http://localhost:5000/';
const medium = "https://medium.com"
form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();

  const searchTerm = searchInput.value;
  // console.log(searchTerm)
  getSearchResults(searchTerm)
    .then(showResults);
}

function getSearchResults(searchTerm) {
  return fetch(`${BASE_URL}search/${searchTerm}`)
    .then(res => res.json());
}

function showResults(results) {
  // console.log(results);
  resultsList.innerHTML=``;
  results.forEach(tag => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    li.appendChild(img);
    img.src = tag.ImageLink;
    const a = document.createElement('a');
    a.textContent = tag.Title;
    // a.href = medium + tag.BlogLink;
    
    a.href = '/blog.html?link=' + tag.id;
    li.appendChild(a);
    resultsList.appendChild(li);
  });
}
