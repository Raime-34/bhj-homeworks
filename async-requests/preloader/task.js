const curencyWrapper = document.getElementById("items");
const loader = document.getElementById("loader");
const url = "http://localhost:3333/slow-get-courses";

const cached = localStorage.getItem("cached");
// Если найдены кэшированные данные,
// то показываем их, но при этом все же запрашиваем актуальные.
//
// После актуализации кэш перезаписываем
// и показываем актаульные данные пользователю
if (cached) {
  loadCurrency(cached);
}

fetch(url)
  .then((response) => {
    loadCurrency(response);
  })
  .catch((error) => {
    console.log(`ERROR: ${error.statusText}:${error.type}`);
  });

/**
 * Отрисовывает полученные курсы
 * @param {Response} response Ответ сервиса курсов
 */
async function loadCurrency(response) {
  const parsed = response instanceof Response ? await response.json() : JSON.parse(response);

  if (parsed.response?.Valute) {
    curencyWrapper.innerHTML = "";

    Object.entries(parsed.response.Valute).forEach(([code, info]) => {
      const item = Object.assign(document.createElement("div"), { className: "item" });

      item.appendChild(Object.assign(document.createElement("div"), { className: "item__code", innerText: code }));
      item.appendChild(Object.assign(document.createElement("div"), { className: "item__value", innerText: info.Value }));
      item.appendChild(Object.assign(document.createElement("div"), { className: "item__currency", innerText: "руб." }));

      curencyWrapper.appendChild(item);
    });

    loader.classList = ["loader"];
    localStorage.setItem("cached", JSON.stringify(parsed));
  }
}
