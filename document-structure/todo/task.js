var todoList;

const storage = window.localStorage;

if (storage.getItem("list")) {
  try {
    todoList = JSON.parse(storage.getItem("list"));
  } catch (error) {
    todoList = {
      list: [],
    };
  }
} else {
  todoList = {
    list: [],
  };
}

const field = document.getElementById("task__input");
const listUI = document.getElementById("tasks__list");

todoList.list.forEach((t, i) => {
  addTaskCard(t, i);
});

document.getElementById("tasks__form").addEventListener("submit", (_event) => {
  _event.preventDefault();

  if (field.value) {
    todoList.list.push(field.value);
    addTaskCard(field.value, todoList.list.length - 1);
  }
});

function addTaskCard(t, i) {
  const card = listUI.appendChild(document.createElement("div"));
  card.classList.add("task");

  const title = card.appendChild(document.createElement("div"));
  title.classList.add("task__title");
  title.innerText = t;

  const rmBtn = card.appendChild(document.createElement("a"));
  rmBtn.href = "#";
  rmBtn.classList.add("task__remove");
  rmBtn.innerHTML = "&times;";
  rmBtn.addEventListener("click", () => {
    todoList.list[i] = undefined;
    card.remove();
  });
}

window.addEventListener("beforeunload", () => {
  todoList.list = todoList.list.filter((t) => t);
  storage.setItem("list", JSON.stringify(todoList));
});
