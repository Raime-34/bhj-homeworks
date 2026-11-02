const dropdown = document.getElementsByClassName("dropdown__value")[0];
const dropdownList = document.getElementsByClassName("dropdown__list")[0];

dropdown.addEventListener("click", () => {
    dropdownList.style.display = 'block';
})

Array.from(document.getElementsByClassName("dropdown__item")).forEach((item) => {
    item.addEventListener("click", function (event) {
        event.preventDefault();
        dropdownList.style.display = 'none';
        dropdown.innerText = this.innerText.trim();
    })
})