const form = document.getElementById("signin__form");
const signin = document.getElementById("signin");
const welcome = document.getElementById("welcome");
const userIdNode = document.getElementById("user_id");
const storage = window.localStorage;
const USER_KEY = "user_id";

function showWelcome(id) {
  userIdNode.textContent = id;
  signin.classList.remove("signin_active");
  welcome.classList.add("welcome_active");
}

const savedId = storage.getItem(USER_KEY);
if (savedId) {
  showWelcome(savedId);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      form.reset();

      if (data.success) {
        storage.setItem(USER_KEY, String(data.user_id));
        showWelcome(data.user_id);
        return;
      }

      alert("Неверный логин/пароль");
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
});

document.getElementById("signout__btn").addEventListener("click", () => {
  storage.removeItem(USER_KEY);
  userIdNode.textContent = "";
  welcome.classList.remove("welcome_active");
  signin.classList.add("signin_active");
});
