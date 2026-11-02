const tabs = Array.from(document.getElementsByClassName("tab"));
const content = Array.from(document.getElementsByClassName("tab__content"));

tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
        content.map((content) => {
            content.classList.remove("tab__content_active");
        })
        tabs.map((tab) => {
            tab.classList.remove("tab_active");
        })

        tabs[i].classList.add("tab_active");
        content[i].classList.add("tab__content_active");
    })
})