const question = document.getElementById("poll__title");
const answerWrapper = document.getElementById("poll__answers");

const url = "http://localhost:3333/poll";

fetch(url).then((response) => {
  loadSurvey(response);
});

/**
 * На основе response отображает вопрос
 * и варианты ответа для пользователя
 * @param {Response} response Ответ сервиса с опросами
 */
async function loadSurvey(response) {
  const parsed = await response.json();
  console.log(parsed);

  if (parsed.data && parsed.data.title && parsed.data.answers) {
    question.innerText = parsed.data.title;

    parsed.data.answers.forEach((answer, i) => {
      const button = document.createElement("button");
      button.classList.add("poll__answer");
      button.innerText = answer;

      button.addEventListener("click", () => {
        alert("Спасибо, ваш голос засчитан!");
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            vote: parsed.id,
            answer: i,
          }),
        })
          .then((response) => {
            if (response.status >= 300) {
              console.log(`ERROR: ${response.statusText}:${response.type}`);
              return;
            }

            loadStats(response);
          })
          .catch((error) => {
            console.log(`ERROR: ${error}`);
          });
      });

      answerWrapper.appendChild(button);
    });
  }
}

/**
 * На основе response отображается
 * статистику пользователю
 * @param {Response} response Ответ сервиса с опросами
 */
async function loadStats(response) {
  const parsed = await response.json();

  if (parsed.stat) {
    const summedVotes = parsed.stat.reduce((sum, item) => sum + item.votes, 0);

    answerWrapper.innerHTML = "";

    parsed.stat.forEach((s) => {
      const line = document.createElement("p");
      line.innerHTML = `${s.answer}: <strong>${((s.votes / summedVotes) * 100).toFixed(2)}%</strong>`;
      answerWrapper.appendChild(line);
    });
  }
}
