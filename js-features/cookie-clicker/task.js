const coockieImg = document.getElementById("cookie")
const counterUI = document.getElementById("clicker__counter");
const avgUI = document.getElementById("avg");
let counter = parseInt(counterUI.innerText);

var lastClick; 

coockieImg.addEventListener("click", () => {
    const { height, width } = coockieImg;
    counterUI.innerText = ++counter;
    if (lastClick) {
        avgUI.innerText = (1/((Date.now() - lastClick)/1000)).toFixed(2);
    }
    lastClick = Date.now();

    coockieImg.setAttribute("height", height * 1.1);
    coockieImg.setAttribute("width", width * 1.1);

    setTimeout(() => {
        coockieImg.setAttribute("height", height);
        coockieImg.setAttribute("width", width);
    }, 100)
})