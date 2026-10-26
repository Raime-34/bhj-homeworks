const timerObj = document.getElementById("timer");
let currentValue = parseInt(timerObj.innerText)

const timerInterval = setInterval(() => {
    let newValue = --currentValue;
    timerObj.innerText = `${format(Math.floor(newValue/3600))}:${format(Math.floor(newValue/60)%60)}:${format(newValue%60)}`;

    if (newValue == 0) {
        alert("Вы победили в конкурсе");
        var raidenImgUrl = document.createElement("a");
        raidenImgUrl.href = "mogging-raiden.png";
        raidenImgUrl.download = "mogging-raiden.png";
        document.body.appendChild(raidenImgUrl);
        raidenImgUrl.click();
        document.body.removeChild(raidenImgUrl);
        clearInterval(timerInterval);
    }
}, 1000);

function format(value) {
    if (value < 1) {
        return "00";
    }

    let valueAsString = String(value);
    return valueAsString.length == 1 ? `0${value}` : value;
}