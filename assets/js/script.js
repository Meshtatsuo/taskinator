//Global Variables

let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let taskIdCounter = 0;
let pageContentEl = document.querySelector("#page-content");

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
  // Check if user is editing a task
  var isEdit = formEl.hasAttribute("data-task-id");
  console.log(isEdit);

  // if editing, call the complete edit task button
  if (isEdit) {
    let taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }

  // if not editing, create task as normal
  else {
    // package up data as an object
    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
  }
};

let editTask = function (taskId) {
  console.log("editing task #" + taskId);

  // get task list item element
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;

  let taskType = taskSelected.querySelector("span.task-type").textContent;
  // set task ID on form so we have access
  formEl.setAttribute("data-task-id", taskId);

  // update form in header for editing
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";

  document
    .querySelector("input[name='task-name']")
    .setAttribute("style", "background-color: yellow;");

  // CUSTOM: Add text above the form to draw attention and instruct user
  let taskHeaderContainer = document.querySelector("#task-form-header");
  let taskEditText = document.createElement("p");
  taskEditText.className = "page-title";
  taskEditText.id = "edit-instruction";
  taskEditText.textContent = "Edit task below, then click save task!";
  taskEditText.setAttribute("style", "color: yellow; font-size: 20px;");
  taskHeaderContainer.appendChild(taskEditText);
};

let completeEditTask = function (taskName, taskType, taskId) {
  // find matching task list item
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // remove extra css changes made for editing
  let editText = document.querySelector("#edit-instruction");
  console.log(editText);
  let taskHeaderContainer = document.querySelector("#task-form-header");
  taskHeaderContainer.removeChild(editText);
  document
    .querySelector("input[name='task-name']")
    .setAttribute("style", "background-color: white;");

  alert("Task Updated!");
  //reset form
  formEl.reset();
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

let deleteTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
};

let taskStatusChangeHandler = function (event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  // add task to new column based on selection
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};

let taskButtonHandler = function (event) {
  console.log(event.target);
  let taskId = event.target.getAttribute("data-task-id");

  // if edit button clicked
  if (event.target.matches(".edit-btn")) {
    editTask(taskId);
  }

  // if delete button clicked
  else if (event.target.matches(".delete-btn")) {
    //Get element's task ID
    deleteTask(taskId);
  }
};

// Event Listeners

formEl.addEventListener("submit", addTaskHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
