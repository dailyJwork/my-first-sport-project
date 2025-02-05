const modalOpen = document.querySelector(".modal-open-btn");
const modalContainer = document.querySelector(".modal-overlay");
const closeModalBtn = document.querySelector(".close-modal-btn");

modalOpen.addEventListener("click", () => {
    modalContainer.classList.add("is-open")
})

closeModalBtn.addEventListener("click", () => {
    modalContainer.classList.remove("is-open")
})