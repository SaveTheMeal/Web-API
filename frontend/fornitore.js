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
        if (loggedUser.id) {
          let button = document.createElement("button");
          button.type = "button";
          button.onclick = () => deleteMeal(meal._id);
          button.textContent = "Elimina";
          li.appendChild(button);
        } else {
          fetch("../fornitore/" + meal.fornitore, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (forn) {
              console.log(forn);
              data.textContent += ", fornitore: " + forn.nomeAttivita;
              return;
            })
            .catch((error) => console.error(error)); // If there is any error you will catch them here
        }
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
          document.getElementById("loggedUser").textContent =
            "Fornitore loggato: " + loggedUser.email;
          loadMeals();
          document.getElementById("textMeals").textContent =
            "Tutti i meal del fornitore " + loggedUser.nomeAttivita;
          document.getElementById("loginform").style.display = "none";
          document.getElementById("logoutButton").style.display = "";
          document.getElementById("divInserimentoMeal").style.display = "";
        }
        return;
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
  }
}

function logout() {
  loggedUser = {};
  document.getElementById("loggedUser").textContent = "";
  loadMeals();
  document.getElementById("textMeals").textContent =
    "Tutti i meal del sistema (eseguire il login per visualizzare i meal del fornitore)";
  document.getElementById("loginform").style.display = "";
  document.getElementById("logoutButton").style.display = "none";
  document.getElementById("divInserimentoMeal").style.display = "none";
  return;
}

function insertMeal() {
  //get the book title
  var dimensione = document.getElementById("dimensioneMeal").value;
  var prezzo = document.getElementById("prezzoMeal").value;

  fetch("../meal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fornitore: loggedUser.id,
      dimensione: dimensione,
      prezzo: prezzo,
      token: loggedUser.token,
    }),
  })
    .then((resp) => {
      console.log(resp);
      loadMeals();
      return;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

function deleteMeal(id) {
  //get the book title
  console.log(id);
  fetch("../meal/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => {
      console.log(resp);
      loadMeals();
      return;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
