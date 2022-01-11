let buttonEl = document.querySelector("#save-task");
console.log(buttonEl);

let tasksToDoEl = document.querySelector("#tasks-to-do");

let addTaskHandler = function () {
  let taskItemEl = document.createElement("li");
  taskItemEl.textContent = prompt("Enter your task!");
  taskItemEl.className = "task-item";

  tasksToDoEl.appendChild(taskItemEl);
};

buttonEl.addEventListener("click", addTaskHandler);
