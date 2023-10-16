// SELECTIONS

const btnAdd = document.querySelector("#btn-add");
const btnEdit = document.querySelector("#btn-edit");
const btnCancel = document.querySelector("#btn-cancel");
const btnClear = document.querySelector("#btn-clear");

const taskName = document.querySelector("#task-name");
const taskEdit = document.querySelector("#task-edit");
const taskSearch = document.querySelector("#task-search");
const taskFilter = document.querySelector("#task-filter");

// -------------------------------------------------------

// Task Class

class Task {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  saveTask() {
    localStorage.setItem(this.id, this.name);
  }
}

// -------------------------------------------------------

// GENERATE ID

const generateId = () => {
  return (Math.random() * (10000 - 0) + 0).toFixed(0);
};

// -------------------------------------------------------

// EVENTS

btnAdd.addEventListener("click", () => {
  const task = new Task(generateId(), taskName.value);
  task.saveTask();
  addTask(task);

  taskName.value = "";
});

btnEdit.addEventListener("click", (e) => {
  editTask(e);
});

btnCancel.addEventListener("click", () => {
  document.querySelector(".edit-container").classList.toggle("hide");
  document.querySelector(".add-container").classList.toggle("hide");
});

btnClear.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    task.classList.remove("hide");
  });
  taskSearch.value = "";
});

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("fa-x")) {
    removeTask(target);
  } else if (target.classList.contains("fa-check")) {
    doneTask(target);
  } else if (target.classList.contains("fa-pencil")) {
    editTaskPage(target);
  }
});

taskSearch.addEventListener("input", (e) => {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    const taskName = task.querySelector("p").innerText;
    const search = e.target.value;
    if (!taskName.includes(search)) {
      task.classList.add("hide");
    } else {
      task.classList.remove("hide");
    }
  });
});

taskFilter.addEventListener("input", (e) => {
  const filter = e.target.value;
  const tasks = document.querySelectorAll(".task");

  switch (filter) {
    case "all":
      tasks.forEach((task) => task.classList.remove("hide"));
      break;
    case "todo":
      tasks.forEach((task) =>
        task.classList.contains("done")
          ? task.classList.add("hide")
          : task.classList.remove("hide")
      );
      break;
    case "done":
      tasks.forEach((task) =>
        task.classList.contains("done")
          ? task.classList.remove("hide")
          : task.classList.add("hide")
      );
      break;
  }
});

// -------------------------------------------------------

// CREATE ELEMENTS

const createTask = (x) => {
  if (localStorage.getItem(x) !== "done") {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    if (localStorage.getItem(x + "-done") === "done") {
      taskDiv.classList.toggle("done");
    }

    const taskNameP = document.createElement("p");
    taskNameP.innerHTML =
      localStorage.getItem(x) !== "done" ? localStorage.getItem(x) : "";
    taskNameP.id = x;
    taskDiv.appendChild(taskNameP);

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const btnDone = document.createElement("button");
    btnDone.innerHTML = `<i id='${x}-done' class='fa-solid fa-check'></i>`;

    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = `<i id='${x}-edit' class='fa-solid fa-pencil'></i>`;

    const btnRemove = document.createElement("button");
    btnRemove.innerHTML = `<i id='${x}-remove' class='fa-solid fa-x'></i>`;

    taskActions.appendChild(btnDone);
    taskActions.appendChild(btnEdit);
    taskActions.appendChild(btnRemove);

    taskDiv.appendChild(taskActions);

    document.querySelector(".tasks").appendChild(taskDiv);
  }
};

// -------------------------------------------------------

// FUNCTIONS

const addTask = (task) => {
  createTask(task.id);
};

const addTasks = () => {
  Object.keys(localStorage).forEach((key) => {
    createTask(key);
  });
};

const editTask = (e) => {
  const taskId = e.target.id;
  localStorage.setItem(taskId, taskEdit.value);
  document.querySelector(".edit-container").classList.toggle("hide");
  document.querySelector(".add-container").classList.toggle("hide");
  document.getElementById(taskId).innerHTML = localStorage.getItem(taskId);
};

const removeTask = (target) => {
  const taskItemId = target.id.replace("-remove", "");
  localStorage.removeItem(taskItemId);
  localStorage.removeItem(taskItemId + "-done");
  target.parentNode.parentNode.parentNode.remove();
};

const doneTask = (target) => {
  const taskItemIdDone = target.id;
  if (localStorage.getItem(taskItemIdDone)) {
    target.parentNode.parentNode.parentNode.classList.remove("done");
    localStorage.removeItem(taskItemIdDone);
  } else {
    target.parentNode.parentNode.parentNode.classList.add("done");
    localStorage.setItem(taskItemIdDone, "done");
  }
};

const editTaskPage = (target) => {
  const taskItemId = target.id.replace("-edit", "");
  document.querySelector(".edit-container").classList.toggle("hide");
  document.querySelector(".add-container").classList.toggle("hide");
  taskEdit.value = localStorage.getItem(taskItemId);
  btnEdit.childNodes[1].id = taskItemId;
};

// -------------------------------------------------------

addTasks();
