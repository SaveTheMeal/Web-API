var loggedUser = {};

function login() {
  //get the form object
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;

  if (email == "" || password == "") {
    document.getElementById("loginError").textContent =
      "Inserisci le credenziali";
  } else {
    fetch("../utente/login", {
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
            "Utente loggato: " + loggedUser.email;
          document.getElementById("loginform").style.display = "none";
          document.getElementById("logoutButton").style.display = "";
          document.getElementById("mealsUtente").style.display = "";
          loadMealsUtente();
        }
        return;
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
  }
}

function logout() {
  loggedUser = {};
  document.getElementById("loggedUser").textContent = "";
  document.getElementById("loginform").style.display = "";
  document.getElementById("logoutButton").style.display = "none";
  return;
}

function loadFornitori() {
  var select = document.getElementById("fornitori");
  fetch("../fornitore")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      console.log(data);
      data.map(function (fornitore) {
        // Map through the results and for each run the code below
        var opt = document.createElement("option");
        opt.value = fornitore._id;
        opt.innerHTML = fornitore.nomeAttivita;
        select.appendChild(opt);
      });
      loadMeals();
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
loadFornitori();

function loadMeals() {
  const ul = document.getElementById("meals"); // Get the list where we will place our authors

  ul.textContent = "";

  let fornitore = document.getElementById("fornitori").value;

  fetch("../meal?fornitore=" + fornitore)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      let i = 1;

      if (data.length > 0) {
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
          if (loggedUser.id && meal.disponibilita == true) {
            let button = document.createElement("button");
            button.type = "button";
            button.onclick = () => acquistaMeal(meal._id);
            button.textContent = "Acquista";
            li.appendChild(button);
          }
          ul.appendChild(li);
          i++;
        });
      } else {
        let li = document.createElement("li");

        let data = document.createTextNode(
          "Al momento non ci sono meal per questo fornitore"
        );
        li.appendChild(data);
        ul.appendChild(li);
      }
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

function loadMealsUtente() {
  const ul = document.getElementById("meals2"); // Get the list where we will place our authors

  ul.textContent = "";

  let utente = loggedUser.id;
  console.log(utente);

  fetch("../acquisto?utente=" + utente)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      console.log(data);
      let i = 1;

      if (data.length > 0) {
        return data.map(function (acquisto) {
          // Map through the results and for each run the code below
          fetch("../meal/" + acquisto.meal, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (meal) {
                fetch("../fornitore/" + meal.fornitore, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                  })
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function (forn) {
                        console.log(forn);
                        let li = document.createElement("li");

                        let data = document.createTextNode(
                          i +
                            ". " +
                            " Fornitore: " +
                            forn.nomeAttivita +
                            ", dimensione: " +
                            meal.dimensione +
                            ", prezzo: " +
                            meal.prezzo +
                            ", stato: " +
                            acquisto.stato +
                            ", pagato: " +
                            acquisto.isPaid +
                            ", borsa: " +
                            acquisto.borsa
                        );
                        li.appendChild(data);
                        ul.appendChild(li);
                        i++;
                      return;
                    })
                    .catch((error) => console.error(error)); // If there is any error you will catch them here
            })
            .catch((error) => console.error(error)); // If there is any error you will catch them here
        });
      } else {
        let li = document.createElement("li");
        let data = document.createTextNode(
          "Nessun meal acquistato"
        );
        li.appendChild(data);
        ul.appendChild(li);
      }
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
