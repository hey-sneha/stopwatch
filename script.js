let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const clearBtn = document.getElementById("clearBtn");
const lapsList = document.getElementById("lapsList");

let lapCount = 0;


// Format time
function formatTime(time) {

    let hours = Math.floor(time / 3600000);

    let minutes = Math.floor((time % 3600000) / 60000);

    let seconds = Math.floor((time % 60000) / 1000);

    let milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}


// Update display
function updateDisplay() {

    const currentTime = Date.now();

    elapsedTime = currentTime - startTime;

    timeDisplay.textContent = formatTime(elapsedTime);
}


// Start / Pause
startBtn.addEventListener("click", function () {

    if (timerInterval === null) {

        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(updateDisplay, 10);

        startBtn.textContent = "⏸ Pause";

        lapBtn.disabled = false;

    } else {

        clearInterval(timerInterval);

        timerInterval = null;

        startBtn.textContent = "▶ Start";

        lapBtn.disabled = true;
    }
});


// Reset
resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    elapsedTime = 0;

    timeDisplay.textContent = "00:00:00.00";

    startBtn.textContent = "▶ Start";

    lapBtn.disabled = true;

    lapCount = 0;

    lapsList.innerHTML = `
        <p class="empty-message">
            Your lap times will appear here
        </p>
    `;
});


// Add Lap
lapBtn.addEventListener("click", function () {

    if (timerInterval === null) {
        return;
    }

    lapCount++;

    const lapItem = document.createElement("div");

    lapItem.classList.add("lap-item");

    lapItem.innerHTML = `
        <span class="lap-number">
            Lap ${lapCount}
        </span>

        <span class="lap-time">
            ${formatTime(elapsedTime)}
        </span>
    `;

    if (lapCount === 1) {
        lapsList.innerHTML = "";
    }

    lapsList.prepend(lapItem);
});


// Clear Laps
clearBtn.addEventListener("click", function () {

    lapCount = 0;

    lapsList.innerHTML = `
        <p class="empty-message">
            Your lap times will appear here
        </p>
    `;
});