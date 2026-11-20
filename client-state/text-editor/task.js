const editor = document.getElementById("editor");
const storage = window.localStorage;
const STORAGE_KEY = "editor";

editor.value = storage.getItem(STORAGE_KEY) ?? "";

editor.addEventListener("input", () => {
  storage.setItem(STORAGE_KEY, editor.value);
});

document.getElementById("clear").addEventListener("click", () => {
  editor.value = "";
  storage.removeItem(STORAGE_KEY);
});
