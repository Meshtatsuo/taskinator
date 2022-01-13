//Global Variables

let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;

// Functions

let createTaskEl = function (taskDataObj) {
  // create list item
  let taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";

  // add task id as custom attribute
  taskItemEl.setAttribute("data-task-id", taskIdCounter);

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

  // Create HTML for action items
  let taskActionsEl = createTaskActions(taskIdCounter);
  taskItemEl.appendChild(taskActionsEl);

  // Add new element to page
  tasksToDoEl.appendChild(taskItemEl);
  formEl.reset();

  //increase task counter for next unique ID
  taskIdCounter++;
};

let createTaskActions = function (taskId) {
  // create div container for task actions
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  let editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  // add button to div container
  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  let deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  // add button to div container
  actionContainerEl.appendChild(deleteButtonEl);

  // create dropdown
  let statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  // add dropdown to container
  actionContainerEl.appendChild(statusSelectEl);

  // add child options to dropdown
  let statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  // return completed container
  return actionContainerEl;
};

let addTaskHandler = function () {
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
