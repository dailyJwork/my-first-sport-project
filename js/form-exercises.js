import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".exercises-form");
const container = document.querySelector(".search-exs-container");
const musclesBtn = document.querySelector(".muscles-btn");

const instance = axios.create({
  baseURL: "https://energyflow.b.goit.study/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getExercises = async (query) => {
  try {
    const responce = await instance.get("/exercises?bodypart=" + query);
    return responce.data;
  } catch (error) {
    alert(error.message);
  }
};

const renderExercises = (query) => {
  getExercises(query).then(({ results }) => {
    if(results.length === 0) {
        iziToast.error({message: "Bad request, 404 not found"})
        form.reset();
        container.innerHTML = '';
        return
    }
    const markup = results.map(({ rating, name, equipment, burnedCalories, target, bodyPart }) => {
      return  `
      <ul class="list searched-items-list">
   <li class="searched-item-forMargin">
    <div class="search-exc-item-wrapper">
      <p class="search-ex-group-title">${name}</p>
      <p class="search-item-rating">${rating} 
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="#EEA10C" />
      </svg>  
    </p>
    <p class="search-eq">equipment: ${equipment}</p>
    <p class="searched-calories">burnedCalories: ${burnedCalories}</p>
    <p class="searched-target">target: ${target}</p>
    <p class="searched-body-part">bodyPart: ${bodyPart}</p>
    </div>
  </li>
</ul>
`
    }).join("");
 container.innerHTML = markup;
  })
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const query = formData.get("exercises-query");
  if(query === "") {
    iziToast.error({
      message: 'Write a part of body',
  });
  return
  }
  renderExercises(query.toLowerCase());
});

musclesBtn.addEventListener("click", () => {
    container.innerHTML = "";
    form.reset();
})
