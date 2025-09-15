
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", handlerSubmit);




function handlerSubmit(event) {
    event.preventDefault();
    const delay = Number(form.elements.delay.value);
    const fielfildValue = form.elements.state.value;
  

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fielfildValue === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);

    });
    promise
        .then((delay) => {
            showToast(`✅ Fulfilled promise in ${delay}ms`, 'green');
        })
        .catch((delay) => {
            showToast(`❌ Rejected promise in ${delay}ms`, 'red')
        });

    form.reset();

    

}

    function showToast(message, bgColor) {
        iziToast.show({
            message,
            position: "topRight",
            icon: "", 
            backgroundColor: bgColor,
            messageColor: "#ffffff",
        });

    };