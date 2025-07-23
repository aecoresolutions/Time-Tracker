const RESET_INTERVAL = 24 * 60 * 60 * 1000; 

let totalTime = parseInt(localStorage.getItem("activeTime")) || 0;
let lastResetTime = parseInt(localStorage.getItem("lastResetTime")) || Date.now();


if (Date.now() - lastResetTime >= RESET_INTERVAL) {
    totalTime = 0;
    lastResetTime = Date.now();
    localStorage.setItem("activeTime", totalTime);
    localStorage.setItem("lastResetTime", lastResetTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let parts = [];
    if (hours > 0) parts.push(`${hours} H`);
    if (minutes > 0 || hours > 0) parts.push(`${minutes} Min`);
    parts.push(`${seconds} Sec`);

    return parts.join(" : ");
}

function updateTime() {
    totalTime += 1000;
    localStorage.setItem("activeTime", totalTime);
    localStorage.setItem("lastResetTime", lastResetTime);
    document.getElementById("time").innerText = formatTime(totalTime);
}

window.addEventListener("load", () => {
    document.getElementById("time").innerText = formatTime(totalTime);
    setInterval(updateTime, 1000);
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("activeTime", totalTime);
    localStorage.setItem("lastResetTime", lastResetTime);
});
