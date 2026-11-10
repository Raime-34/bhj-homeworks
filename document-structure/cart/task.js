let cartInfo = {};
const cart = document.querySelector(".cart__products");

const storage = window.localStorage;
if (storage.getItem("info")) {
  try {
    cartInfo = JSON.parse(storage.getItem("info"));
  } catch (error) {
    cartInfo = {};
  }
}

function renderCard(product, id) {
  const card = cart.appendChild(document.createElement("div"));
  card.classList.add("cart__product");

  const img = card.appendChild(document.createElement("img"));
  img.classList.add("cart__product-image");
  img.src = product.querySelector(".product__image").src;

  const removeBtn = card.appendChild(document.createElement("div"));
  removeBtn.classList.add("rm");
  removeBtn.addEventListener("click", () => {
    delete cartInfo[id];
    card.remove();
  });

  cartInfo[id].counter = card.appendChild(document.createElement("div"));
  cartInfo[id].counter.classList.add("cart__product-count");
  cartInfo[id].counter.innerText = cartInfo[id].count || 0;

  return card;
}

for (const id in cartInfo) {
  if (!cartInfo[id] || cartInfo[id].count == null) {
    delete cartInfo[id];
    continue;
  }

  delete cartInfo[id].counter;

  const product = document.querySelector(`.product[data-id="${id}"]`);
  if (!product) continue;
  renderCard(product, id);
}

Array.from(document.getElementsByClassName("product__quantity-control_inc")).forEach((incBtn) => {
  const product = incBtn.closest(".product");
  const counter = product.querySelector(".product__quantity-value");

  incBtn.addEventListener("click", () => {
    counter.innerText++;
  });
});

Array.from(document.getElementsByClassName("product__quantity-control_dec")).forEach((decBtn) => {
  const product = decBtn.closest(".product");
  const counter = product.querySelector(".product__quantity-value");

  decBtn.addEventListener("click", () => {
    counter.innerText = --counter.innerText == 0 ? 1 : counter.innerText;
  });
});

Array.from(document.getElementsByClassName("product__add")).forEach((addBtn) => {
  const product = addBtn.closest(".product");
  const id = product.dataset.id;
  const counter = product.querySelector(".product__quantity-value");

  addBtn.addEventListener("click", () => {
    cartInfo[id] ??= {};

    if (!cartInfo[id].counter) {
      cartInfo[id].count = 0;
      const card = renderCard(product, id);

      const from = product.getBoundingClientRect();
      const to = card.getBoundingClientRect();

      const a = product.appendChild(document.createElement("img"));
      a.src = product.querySelector(".product__image").src;
      a.classList.add("cart__product-image");
      a.style.position = "absolute";
      a.style.left = 0 + "px";
      a.style.top = 0 + "px";

      const anim = a.animate(
        [
          { left: from.left + "px", top: from.top + "px" },
          { left: to.left + "px", top: to.top + "px" },
        ],
        { duration: 400 },
      );
      anim.addEventListener("finish", () => {
        a.remove();
      });
    }

    cartInfo[id].counter.innerText -= -counter.innerText;
    cartInfo[id].count -= -counter.innerText;
  });
});

window.addEventListener("beforeunload", () => {
  const info = {};
  for (const id in cartInfo) {
    info[id] = { count: cartInfo[id].count };
  }
  storage.setItem("info", JSON.stringify(info));
});
