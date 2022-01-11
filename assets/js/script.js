let formEl = document.querySelector("#task-form");

let tasksToDoEl = document.querySelector("#tasks-to-do");

let addTaskHandler = function () {
  event.preventDefault();
  let taskItemEl = document.createElement("li");
  let taskTextEl = document.querySelector;
  console.log(taskTextEl);
  taskItemEl.textContent = taskTextEl;
  taskItemEl.className = "task-item";

  tasksToDoEl.appendChild(taskItemEl);
};

formEl.addEventListener("submit", addTaskHandler);
