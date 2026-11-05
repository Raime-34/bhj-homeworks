const prompts = Array.from(document.getElementsByClassName("rotator__case"));
let currentPrompt = 0;

// единожды применяем цвета
// так как они все равно не меняются в рантайме
prompts.map((prompt) => {
  prompt.style.color = prompt.dataset.color;
});

// закоментил варинат с интервалом
// и в итоге сделал через таймаут
// чтобы не очищать его постоянно

// setInterval(() => {
//   prompts.map((prompt) => {
//     prompt.classList.remove("rotator__case_active");
//   });

//   if (++currentPrompt >= prompts.length) {
//     currentPrompt = 0;
//   }

//   prompts[currentPrompt].classList.add("rotator__case_active");
// }, 1000);

next();

function next() {
  setTimeout(() => {
    prompts.map((prompt) => {
      prompt.classList.remove("rotator__case_active");
    });

    if (++currentPrompt >= prompts.length) {
      currentPrompt = 0;
    }

    prompts[currentPrompt].classList.add("rotator__case_active");
    next();
  }, parseInt(prompts[currentPrompt].dataset.speed));
}
