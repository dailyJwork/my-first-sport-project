import axios from "axios";
const exerciseTitle = document.querySelector(".exercises-title");
const exerciseBtn = document.querySelector(".body-parts-btn");
const exerciseForm = document.querySelector(".exercises-form");
const musclesBtn = document.querySelector(".muscles-btn");
const imgList = document.querySelector(".img-exercises-items-wrapper");
const loadingText = document.querySelector(".loading-text");
const searchBtn = document.querySelector(".exercises-search-btn");

exerciseBtn.addEventListener("click", () => {
  exerciseForm.classList.add("is-open-form");
  musclesBtn.classList.remove("muscles-btn");
  exerciseTitle.textContent = "Exercises / Waist";
  imgList.innerHTML = "";
});

musclesBtn.addEventListener("click", () => {
  exerciseForm.classList.remove("is-open-form");
  exerciseTitle.textContent = "Exercises";
  renderMuscles();
});

searchBtn.addEventListener("click", () => {
  loadingText.classList.remove("loading-hide");
  setTimeout(() => {
    loadingText.classList.add("loading-hide");
  }, 250)
});

const instance = axios.create({
  baseURL: "https://energyflow.b.goit.study/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getMusclesExercises = async () => {
  try {
    const responce = await instance.get(
      "/filters?filter=Muscles&page=1&limit=8"
    );
    return responce.data;
  } catch (error) {
    alert(error.message);
  }
};

const renderMuscles = async () => {
  getMusclesExercises().then(({ results }) => {
    const markup = results
      .map(({ imgUrl, name, filter }) => {
        return `
        <ul class="exercises-img-container list">
        <li class="exercises-muscles-item">
            <img src="${imgUrl}" alt="sport photo" class="exercises-muscles-img">
            <div class="exercises-items-wrapper">
            <h3 class="exercises-muscles-title">${name}</h3>
            <p class="exercises-muscles-descr">${filter}</p>
            </div> 
          </li>
          </ul>
        `;
      })
      .join("");
    imgList.insertAdjacentHTML("beforeend", markup);
  });
};

renderMuscles();

///// daily phrase
const content = document.querySelector(".daily-phrase-content");
const dailyAuthor = document.querySelector(".daily-phrase-author");

const getDailyPhrase = async () => {
  try {
    const responce = await instance.get("/quote");
    return responce.data;
  } catch (error) {
    console.log(error.message);
  }
};

const renderDailyPhrase = () => {
  getDailyPhrase().then(({ quote, author }) => {
    dailyAuthor.textContent = author;
    content.textContent = quote;
  });
};

renderDailyPhrase();
