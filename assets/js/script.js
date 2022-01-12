let formEl = document.querySelector("#task-form");

let tasksToDoEl = document.querySelector("#tasks-to-do");

let createTaskEl = function (taskDataObj) {
  // create list item
  let taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";

  // create div to hold task info and add to list item
  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  //Append HTML to new LI element
  taskItemEl.appendChild(taskInfoEl);

  // Add new element to page
  tasksToDoEl.appendChild(taskItemEl);
  formEl.reset();
};

let addTaskHandler = function () {
  event.preventDefault();

  event.preventDefault();
  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    formEl.reset();
    return false;
  }

  // package up data as an object
  let taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};

formEl.addEventListener("submit", addTaskHandler);
