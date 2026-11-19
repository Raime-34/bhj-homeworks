const progressBar = document.getElementById("progress");
const form = document.getElementById("form");
const url = "http://localhost:3333/upload";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.upload.addEventListener("progress", (event) => {
    progressBar.value = event.loaded / event.total;
  });

  xhr.send(new FormData(form));
});
