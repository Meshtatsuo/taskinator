let formEl = document.querySelector("#task-form");

let tasksToDoEl = document.querySelector("#tasks-to-do");

let addTaskHandler = function () {
  event.preventDefault();

  // create list item
  let taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";
  let taskNameEl = document.querySelector("input[name='task-name']").value;

  // create div to hold task info and add to list item
  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  let taskCatEl = document.querySelector("select[name='task-type']").value;

  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskNameEl +
    "</h3><span class='task-type'>" +
    taskCatEl +
    "</span>";
  //Append HTML to new LI element
  taskItemEl.appendChild(taskInfoEl);

  // Add new element to page
  tasksToDoEl.appendChild(taskItemEl);
};

formEl.addEventListener("submit", addTaskHandler);
