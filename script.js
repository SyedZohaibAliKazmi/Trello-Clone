// ============================== v1 folder code ======================================
// Saray colum select kay liya ya variable create kara ha

const column = document.querySelectorAll(".column");

const createTicket = (value) => {
  // paragraph add hojayega new input may jo add karengay

  const ticket = document.createElement("p");

  // console.log(ticket);
  const elementText = document.createTextNode(value);
  // console.log(elementText);

  ticket.setAttribute("draggable", "true");
  ticket.appendChild(elementText);

  return ticket;
};

// ================================================ v2 folder code =================================

let savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
// console.log(savedTasks);

if (!savedTasks) {
  savedTasks = {};
}

// jo phale se save task hy localStorage ma wo display karwane ko
// for (let i = 0; i < savedTasks.length; i++) {
//   console.log(savedTasks[i]);
//   const p = createTicket(savedTasks[i]);

//   columns[1].insertBefore(p, columns[1].lastElementChild);
// }

const addTask = (event) => {
  // page refresh par remove nahi hoga
  event.preventDefault();
  // /input
  const currentForm = event.target;
  //   input elements konsay index par ha ya pata karay ga
  const value = currentForm.elements[0].value;

  const parent = currentForm.parentElement;

  // extra empty div add hojayegi
  const ticket = createTicket(value);

  //  form say phelay jo input may add kara hoga woh add hojayega colum may
  parent.insertBefore(ticket, currentForm);

  //   ya variable colum ki heading ha issay ya pata chalay ga local storage may jo save ho raha ha woh konsay colum say aaya ha
  const h3Value = parent.children[0].innerText;

  if (!Array.isArray(savedTasks[h3Value])) {
    // agar array nhi hy tw khali array show karwado q kay push nahi ho sakta
    savedTasks[h3Value] = [];
  }

  savedTasks[h3Value].push(value);
  //   jason string may convert hokar show hoga local storage may

  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

  //    input clear kay liya use hoa ha
  currentForm.reset();
};
// form akhri element ha colum ka
for (let i = 0; i < column.length; i++) {
  const form = column[i].lastElementChild;

  form.addEventListener("submit", addTask);
}
