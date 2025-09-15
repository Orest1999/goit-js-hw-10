import flatpickr from "flatpickr";
import iziToast from "izitoast";
import toastIcon from '../img/Group.svg'
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";


const calendar = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("[data-start]");
const timerDays = document.querySelector("[data-days]");
const timerHours = document.querySelector("[data-hours]");
const timerMinutes = document.querySelector("[data-minutes]");
const timerSeconds = document.querySelector("[data-seconds]");
btnStart.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
    const now = Date.now();
    userSelectedDate = selectedDates[0];
    
    if (selectedTime <= now) {
      iziToast.error(
        {
          message: "Please choose a date in the future",
          position: 'topRight',
          backgroundColor: '#EF4040',
          iconUrl: toastIcon,
          messageColor: '#ffffff',
        })
       };
    btnStart.disabled = selectedTime <= now;
  
  },
};

flatpickr(calendar, options);

btnStart.addEventListener("click", () => {
  btnStart.disabled = true;
  calendar.disabled = true;
   


  const intervalId = setInterval(() => {
    const timeNow = Date.now()
    let deltaTimeM = userSelectedDate.getTime() - timeNow;
    

    const time = convertMs(deltaTimeM);


    if (deltaTimeM <= 0) {
      calendar.disabled = false;
      clearInterval(intervalId);
      iziToast.success(
        {
          message: "Your timer has finished",
          position: 'center',
          backgroundColor: 'green',
          iconColor: '#ffffff',
          messageColor: '#ffffff',
        }
      )
    } else {
      updateTimer(time);

    }
  
    

  }, 1000);

  
});

function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = `${days}`;
  timerHours.textContent = `${hours}`;
  timerMinutes.textContent = `${minutes}`;
  timerSeconds.textContent = `${seconds}`;
  
}



function addLeadingZero(value) {
  return String(value).padStart(2, "0");
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}