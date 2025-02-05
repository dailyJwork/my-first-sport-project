import axios from "axios";

const container = document.querySelector(".favorite-exercises-list");
const loadMoreBtn = document.querySelector(".load-more-favBtn");

const instance = axios.create({
  baseURL: "https://energyflow.b.goit.study/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getExercises = async (params) => {
  try {
    const responce = await instance.get("/exercises", { params });
    return responce.data;
  } catch (error) {
    console.log(error.message);
  }
};

const renderExercises = async (results) => {
  const markup = results
    .map(({ gifUrl, name, description, target, burnedCalories, bodyPart }) => {
      return `
            <li class="fav-ex-list-item">
    <img src="${gifUrl}" alt="exercise gif" class="fav-ex-img">
    <h3 class="fav-ex-title">${name}</h3>
    <p class="fav-ex-descr">${description}</p>
    <p class="fav-ex-target">target: ${target.toUpperCase()}</p>
    <p class="fav-ex-calories">burnedCalories: ${burnedCalories}</p>
    <p class="fav-ex-bodypart">bodyPart: ${bodyPart}</p>
</li>
            `;
    })
    .join("");
  container.insertAdjacentHTML("beforeend", markup);
};

/// пагинация

const createExercisesRequest = () => {
  let page = 1;
  const limit = 6;
  let isLastPage = false;

  return async() => {
    if(isLastPage) {
      alert("Its last page, sorry")
      return}

    try {
      const { results, totalPages } = await getExercises({ page, limit });

      if(page >= Math.ceil(totalPages / limit)) {
        isLastPage = true;
      }

      page += 1;
      return results;
    } catch (error) {
      console.log(error.message);
    }
  }
}


const fetchExercises = createExercisesRequest()

loadMoreBtn.addEventListener("click", async () => {
  const exercises = await fetchExercises();
  renderExercises(exercises);
  loadMoreBtn.textContent = "Load More";
})

//// test