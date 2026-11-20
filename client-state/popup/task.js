const modal = document.getElementById("subscribe-modal");
const COOKIE_NAME = "subscribeModalClosed";

function isModalClosed() {
  return document.cookie.split(";").some((part) => part.trim().startsWith(`${COOKIE_NAME}=`));
}

if (!isModalClosed()) {
  modal.classList.add("modal_active");
}

modal.querySelector(".modal__close").addEventListener("click", () => {
  modal.classList.remove("modal_active");
  document.cookie = `${COOKIE_NAME}=1; max-age=31536000; path=/`;
});
