// script.js
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapTimes = document.getElementById("lapTimes");

// Format time as HH:MM:SS:MS
function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  //let milliseconds = Math.floor((time % 1000) / 10);

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")// +
    //":" +
   // String(milliseconds).padStart(2, "0")
  );
}

// Update the display
function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

// Start or pause the stopwatch
function startPause() {
  if (isRunning) {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "Start";
    isRunning = false;
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startPauseBtn.textContent = "Pause";
    isRunning = true;
  }
}

// Reset the stopwatch
function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  startPauseBtn.textContent = "Start";
  isRunning = false;
  lapTimes.innerHTML = "";
}

// Record a lap time
function lap() {
  if (isRunning) {
    const lapTime = document.createElement("li");
    lapTime.textContent = formatTime(elapsedTime);
    lapTimes.appendChild(lapTime);
  }
}

// Event Listeners
startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);