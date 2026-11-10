const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
document.body.append(tooltip);

let openedLink = null;

document.querySelectorAll(".has-tooltip").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (openedLink === link) {
      tooltip.classList.remove("tooltip_active");
      openedLink = null;
      return;
    }

    openedLink = link;
    tooltip.textContent = link.getAttribute("title");
    tooltip.classList.add("tooltip_active");

    const linkBox = link.getBoundingClientRect();
    const tipBox = tooltip.getBoundingClientRect();
    const position = link.dataset.position || "bottom";

    let left = linkBox.left;
    let top = linkBox.bottom;

    if (position === "top") {
      top = linkBox.top - tipBox.height;
    } else if (position === "left") {
      left = linkBox.left - tipBox.width;
      top = linkBox.top;
    } else if (position === "right") {
      left = linkBox.right;
      top = linkBox.top;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  });
});
