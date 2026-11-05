const fontSelectors = Array.from(document.getElementsByClassName("font-size"));
const colorSelectors = Array.from(document.getElementsByClassName("color")).slice(0, 3);
const bgColorSelectors = Array.from(document.getElementsByClassName("color")).slice(3);

const book = document.getElementById("book");

fontSelectors.forEach((btn) => {
  btn.addEventListener("click", (_event) => {
    _event.preventDefault();

    fontSelectors.map((innerBtn) => {
      innerBtn.classList.remove("font-size_active");
    });

    btn.classList.add("font-size_active");

    book.classList.remove("book_fs-big");
    book.classList.remove("book_fs-small");

    if (btn.dataset.size) {
      book.classList.add(`book_fs-${btn.dataset.size}`);
    }
  });
});

colorSelectors.forEach((btn) => {
  btn.addEventListener("click", (_event) => {
    _event.preventDefault();

    colorSelectors.map((innerBtn) => {
      innerBtn.classList.remove("color_active");
    });

    btn.classList.add("color_active");

    book.classList.remove("book_color-black");
    book.classList.remove("book_color-gray");
    book.classList.remove("book_color-whitesmoke");

    if (btn.dataset.textColor) {
      book.classList.add(`book_color-${btn.dataset.textColor}`);
    }
  });
});

bgColorSelectors.forEach((btn) => {
  btn.addEventListener("click", (_event) => {
    _event.preventDefault();

    bgColorSelectors.map((innerBtn) => {
      innerBtn.classList.remove("color_active");
    });

    btn.classList.add("color_active");

    book.classList.remove("book_bg-gray");
    book.classList.remove("book_bg-black");
    book.classList.remove("book_bg-white");

    if (btn.dataset.bgColor) {
      book.classList.add(`book_bg-${btn.dataset.bgColor}`);
    }
  });
});
