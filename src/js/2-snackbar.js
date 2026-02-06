import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")
let inputDelay = form.querySelector("input");
const inputState = form.elements.state;
const btn = form.querySelector("button");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const delayValue = inputDelay.value;
    const stateValue = inputState.value;
    
    const promises = new Promise((resolve, reject) => {

        setTimeout(() => {
            if (stateValue === "fulfilled") {
                resolve(delayValue)
            } else {
                reject(delayValue)
            };
        }, delayValue); 
    });
    

    promises
        .then((time) => {
            iziToast.success({
            message: `✅ Fulfilled promise in ${delayValue}ms`,
            position: 'topRight'
            })
        })
        .catch((time) => {
            iziToast.error({
            message: `❌ Rejected promise in ${delayValue}ms`,
            position: 'topRight'
            })
        });
    
    form.reset();

}