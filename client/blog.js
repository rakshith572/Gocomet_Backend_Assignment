

// const form = document.querySelector('form');
const main = document.querySelector('main');
const id = window.location.search.match(/link=(.*)/)[1];
const BASE_URL = 'http://localhost:5000/';
const resultsList = document.querySelector('#results')
const medium = "http://medium.com/"


getMovie(id).then(showResults)


function getMovie(id) {
  return fetch(`${BASE_URL}blog/${id}`)
    .then(res => res.json());
}

function showResults(blog) {
  // console.log(blog);
  resultsList.innerHTML=``;

  // const h3=document.createElement('h3')
  // h3.textContent=`${blog.Title}`
  // resultsList.appendChild(h3)

 
    
  var div = document.createElement('div')
  div.innerHTML=`${blog.HtmlContent}`

  resultsList.appendChild(div)

  var li = document.createElement('li');
  var img = document.createElement('img');
  li.appendChild(img);
  img.src = blog.BlogImgae;
  
  var a = document.createElement('a');
  a.textContent = "Blog Link";
  
  a.href = medium + blog.BlogLink;
  li.appendChild(a);

  resultsList.appendChild(li);



  li = document.createElement('li');
  img = document.createElement('img');
  li.appendChild(img);
  img.src = blog.AutherImage;
  a = document.createElement('a');
  a.textContent = "Author Profile";
  
  a.href = medium + blog.AuthorLink;
  li.appendChild(a);
  resultsList.appendChild(li);

}

