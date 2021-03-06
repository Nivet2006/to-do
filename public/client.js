// client-side js
// run by the browser each time your view template referencing it is loaded

console.log("hello world :o");

const tasks = [];

// define variables that reference elements on our page
const tasksForm = document.forms[0];
const taskInput = tasksForm.elements["task"];
const tasksList = document.getElementById("taskss");
const clearButton = document.querySelector("#clear-tasks");

// request the tasks from our app's sqlite database
fetch("/getTasks", {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
      appendNewTask(row.task);
    });
  });

// a helper function that creates a list item for a given task
const appendNewTask = task => {
  const newListItem = document.createElement("li");
  newListItem.innerText = task;
  tasksList.appendChild(newListItem);
};

// listen for the form to be submitted and add a new task when it is
tasksForm.onsubmit = event => {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const data = { task: taskInput.value };

  fetch("/addTask", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
    });
  // get task value and add it to the list
  tasks.push(taskInput.value);
  appendNewTask(taskInput.value);

  // reset form
  taskInput.value = "";
  taskInput.focus();
};

clearButton.addEventListener("click", event => {
  fetch("/clearTasks", {})
    .then(res => res.json())
    .then(response => {
      console.log("cleared tasks");
    });
  tasksList.innerHTML = "";
});
