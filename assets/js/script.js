//Global Variables

let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let taskIdCounter = 0;
let pageContentEl = document.querySelector("#page-content");

//Tasks
let tasks = [];

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

  // Add new element to page in respective column
  if (taskDataObj.status === "to do") {
    tasksToDoEl.appendChild(taskItemEl);
  } else if (taskDataObj.status === "in progress") {
    tasksInProgressEl.appendChild(taskItemEl);
  } else if (taskDataObj.status === "completed") {
    tasksCompletedEl.appendChild(taskItemEl);
  }

  formEl.reset();
  // add ID to data object and adds the task object to the tasks array
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  // save tasks array to local storage
  saveTasks();

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
      status: "to do",
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

  // loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  // save tasks array to local storage
  saveTasks();

  // remove extra css changes made for editing
  let editText = document.querySelector("#edit-instruction");
  console.log(editText);
  let taskHeaderContainer = document.querySelector("#task-form-header");
  taskHeaderContainer.removeChild(editText);
  document
    .querySelector("input[name='task-name']")
    .setAttribute("style", "background-color: white;");

  alert("Task Updated!");
  // save tasks array to local storage
  saveTasks();
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

  // create new array to hold updated lists of tasks
  let updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match value of taskId, keep task
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;

  // save tasks array to local storage
  saveTasks();
};

let taskStatusChangeHandler = function (event) {
  debugger;
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

  //update task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }

  // save tasks array to local storage
  saveTasks();
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

let saveTasks = function () {
  // convert tasks array into a string to save into local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

let loadTasks = function () {
  // load tasks in from local storage
  let savedTasks = localStorage.getItem("tasks");

  if (!savedTasks) {
    return false;
  }

  savedTasks = JSON.parse(savedTasks);

  // loop through savedTasks array
  for (var i = 0; i < savedTasks.length; i++) {
    // pass each task object into the `createTaskEl()` function
    createTaskEl(savedTasks[i]);
  }
};

// Event Listeners

formEl.addEventListener("submit", addTaskHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// Load tasks on page startup
loadTasks();
