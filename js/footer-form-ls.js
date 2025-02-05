import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".footer-subscribe-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const inputQuery = formData.get("footer-input-subscribe");

    if(!inputQuery.includes(".com") || !inputQuery.includes("@")) {
        iziToast.error({
            message: 'Not currect email',
        });
        return
    }
    
    localStorage.setItem("subcribe-email", inputQuery);
    form.reset();
    iziToast.success({
        message: `We will sent you the confirm email to ${inputQuery}`,
    });
})