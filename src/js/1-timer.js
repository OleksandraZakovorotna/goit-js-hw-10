import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector("#datetime-picker");
const btn = document.querySelector("button[data-start]");
const daysId = document.querySelector("span[data-days]");
const hoursId = document.querySelector("span[data-hours]");
const minsId = document.querySelector("span[data-minutes]");
const secsId = document.querySelector("span[data-seconds]");

let userDate = null;
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
        btn.disabled = false;
        userDate = selectedDate;
    }
    else {
        btn.disabled = true;
        iziToast.error({
            title: 'Error',
            message: "Please choose a date in the future",
            position: 'topRight',
        });
    };
  },
};

flatpickr("#datetime-picker", options);


btn.addEventListener("click", handleClick);

function handleClick(event) {
    btn.disabled = true;
    input.disabled = true;
    if (userDate === null) {
        return
    };

    const timerId = setInterval(() => {
        let currentTime = new Date();
        const deltaTime = userDate - currentTime;

        if (deltaTime <= 0) {
            clearInterval(timerId);
            daysId.textContent = '00';
            hoursId.textContent = '00';
            minsId.textContent = '00';
            secsId.textContent = '00';
            input.disabled = false;
        };

        const timer = convertMs(deltaTime);

        daysId.textContent = addLeadingZero(timer.days);
        hoursId.textContent = addLeadingZero(timer.hours);
        minsId.textContent = addLeadingZero(timer.minutes);
        secsId.textContent = addLeadingZero(timer.seconds);

    }, 1000); 
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


function addLeadingZero(value) {
    return String(value).padStart(2, "0")
};



