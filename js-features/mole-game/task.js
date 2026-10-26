let deadCounter = 0;
let lostCounter = 0;

const deadUI = document.getElementById("dead");
const lostUI = document.getElementById("lost");

document.querySelectorAll(".hole").forEach(hole => {
    hole.addEventListener("click", () => {
        if (Array.from(hole.classList).includes("hole_has-mole")) {
            deadUI.textContent = ++deadCounter;

            if (deadCounter == 10) {
                alert("Победа");
                reset();
            }
        } else {
            lostUI.textContent = ++lostCounter;

            if (lostCounter == 5) {
                alert("Поражение");
                reset();
            }
        }
    })
});

function reset() {
    deadCounter = 0;
    lostCounter = 0;

    deadUI.textContent = deadCounter;
    lostUI.textContent = lostCounter;
}