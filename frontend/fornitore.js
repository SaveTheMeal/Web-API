function loadMeals() {
  const ul = document.getElementById("meals"); // Get the list where we will place our authors

  ul.textContent = "";

  fetch(variables.API_URL + "meal",{mode: "no-cors"})
  
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      console.log(data);
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
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
loadMeals();
