function loadMeals() {
  const ul = document.getElementById("meals"); // Get the list where we will place our authors

  ul.textContent = "";

  fetch("../meal")

    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      console.log(data);
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
/*
return data.map(function (book) {
// Map through the results and for each run the code below

// let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);

let li = document.createElement("li");
let span = document.createElement("span");
// span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
let a = document.createElement("a");
a.href = book.self;
a.textContent = book.title;
// span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
let button = document.createElement("button");
button.type = "button";
button.onclick = () => takeBook(book.self);
button.textContent = "Take the book";

// Append all our elements
span.appendChild(a);
span.appendChild(button);
li.appendChild(span);
ul.appendChild(li);
});*/

function login() {
  //get the form object
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;


  fetch('../fornitore', {
      method: 'POST',
      headers: { 'Content-Type': 'fornitore/json' },
      body: JSON.stringify({ email: email, password: password }),
  })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) { // Here you get the data to modify as you please
          console.log(data);
          loggedUser.token = data.token;
          loggedUser.email = data.email;
          loggedUser.id = data.id;
          // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
          document.getElementById("loggedUser").textContent = loggedUser.email;
          return;
      })
      .catch(error => console.error(error)); // If there is any error you will catch them here

};

loadMeals();
