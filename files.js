// Select elements
const column = document.querySelectorAll(".column");
const main = document.querySelector("#main");
const addCardBtn = document.querySelector("#addCard");

// Function to create a new ticket
const createTicket = (value) => {
  const ticket = document.createElement("p");
  const elementText = document.createTextNode(value);
  ticket.setAttribute("draggable", "true");
  ticket.appendChild(elementText);
  return ticket;
};

// Function to add a new task
const addTask = (event) => {
  event.preventDefault();
  const currentForm = event.target;
  const value = currentForm.elements[0].value;
  const parent = currentForm.parentElement;
  const ticket = createTicket(value);
  parent.insertBefore(ticket, currentForm);
  const h3Value = parent.children[0].innerText;

  if (!Array.isArray(savedTasks[h3Value])) {
    savedTasks[h3Value] = [];
  }

  savedTasks[h3Value].push(value);
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
  currentForm.reset();
};

// Function to create a new card
const myCreateCard = (cardTitle) => {
  const myDiv = document.createElement("div");
  const myH3 = document.createElement("h3");
  const myForm = document.createElement("form");
  const myInput = document.createElement("input");
  const h3Text = document.createTextNode(cardTitle);

  myDiv.setAttribute("class", "column");
  myInput.setAttribute("type", "text");
  myInput.setAttribute("placeholder", "add task");

  myH3.appendChild(h3Text);
  myForm.appendChild(myInput);
  myDiv.appendChild(myH3);
  myDiv.appendChild(myForm);

  myForm.addEventListener("submit", addTask);

  return myDiv;
};

// Load saved tasks from local storage
let savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || {};

// Display saved tasks
for (const mainTask in savedTasks) {
  const amDiv = myCreateCard(mainTask);
  const tasks = savedTasks[mainTask];

  tasks.forEach(task => {
    const ticket = createTicket(task);
    amDiv.insertBefore(ticket, amDiv.querySelector("form"));
  });

  main.insertBefore(amDiv, addCardBtn);
}

// Event listener for adding a new card
addCardBtn.addEventListener("click", () => {
  const cardTitle = prompt("Enter card name?");
  if (cardTitle) {
    const yourDiv = myCreateCard(cardTitle);
    main.insertBefore(yourDiv, addCardBtn);
  }
});

// Add event listeners to existing columns
column.forEach(col => {
  const form = col.querySelector("form");
  form.addEventListener("submit", addTask);
});