var loggedUser = {};

function loadMeals() {
  const ul = document.getElementById("meals"); // Get the list where we will place our authors

  ul.textContent = "";

  link = "";
  if (loggedUser.id) {
    link = "../meal?fornitore=" + loggedUser.id;
  } else {
    link = "../meal";
  }
  fetch(link)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      console.log(data);

      let i = 1;

      return data.map(function (meal) {
        // Map through the results and for each run the code below

        let li = document.createElement("li");

        let data = document.createTextNode(
          i +
            ". " +
            " Dimensione: " +
            meal.dimensione +
            ", disponibilità: " +
            meal.disponibilita +
            ", prezzo: " +
            meal.prezzo
        );
        li.appendChild(data);

        /*
        let span = document.createElement("span");
        // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
        let a = document.createElement("a");
        a.href = meal.self;
        a.textContent = meal.title;
        // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
        let button = document.createElement("button");
        button.type = "button";
        button.onclick = () => takeBook(meal.self);
        button.textContent = "Take the book";

        // Append all our elements
        span.appendChild(a);
        span.appendChild(button);
        li.appendChild(span);
        */
        ul.appendChild(li);
        i++;
      });
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
loadMeals();

function login() {
  //get the form object
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;

  if (email == "" || password == "") {
    document.getElementById("loginError").textContent =
      "Inserisci le credenziali";
  } else {
    fetch("../fornitore/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        // Here you get the data to modify as you please
        if (data.message) {
          document.getElementById("loginError").textContent = data.message;
        } else {
          console.log(data);
          document.getElementById("loginError").textContent = "";
          loggedUser = data;
          // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
          document.getElementById("loggedUser").textContent =
            "Fornitore loggato: " + loggedUser.email;
          loadMeals();
          document.getElementById("textMeals").textContent = "Tutti i meal del fornitore " + loggedUser.nomeAttivita;
        }
        return;
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
  }
}
