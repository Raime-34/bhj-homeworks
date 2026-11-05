const hiden = Array.from(document.getElementsByClassName("reveal"));

window.addEventListener("scroll", () => {
  hiden.forEach((el) => {
    const { top, bottom } = el.getBoundingClientRect();
    el.classList.remove("reveal_active");
    if (top > 0 && bottom < window.innerHeight) {
      el.classList.add("reveal_active");
    }
  });
});
