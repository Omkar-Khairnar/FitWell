

function timerWatch(startBtn1, stopBtn1, inputMin1, inputSec1, setBtn1, timer1) {

    let startBtn = document.getElementById(`${startBtn1}`);
    let stopBtn = document.getElementById(`${stopBtn1}`);
    let inputMin = document.getElementById(`${inputMin1}`);
    let inputSec = document.getElementById(`${inputSec1}`);
    let setBtn = document.getElementById(`${setBtn1}`);
    let timer = document.getElementById(`${timer1}`);

    let intervalId;
    let min = 0;
    let sec = 0;

    function startTimer() {
        intervalId = setInterval(updateTimer, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }

    function stopTimer() {
        clearInterval(intervalId);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }

    function updateTimer() {
        sec--;
        if (sec < 0) {
            sec = 59;
            min--;
        }
        if (min < 0) {
            clearInterval(intervalId);
            startBtn.disabled = false;
            stopBtn.disabled = true;
            min = 0;
            sec = 0;

        }
        timer.innerText = `${min}:${sec.toString().padStart(2, "0")}`;
        if (min === 0 && sec === 0) {
            timer.innerText = "Times Up!";
        }
    }

    function setTimer() {
        min = parseInt(inputMin.value);
        sec = parseInt(inputSec.value);
        timer.innerText = `${min}:${sec.toString().padStart(2, "0")}`;
    }

    startBtn.addEventListener("click", startTimer);
    stopBtn.addEventListener("click", stopTimer);
    setBtn.addEventListener("click", setTimer);
}
