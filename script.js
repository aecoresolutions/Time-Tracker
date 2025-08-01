let totalTime = parseInt(localStorage.getItem("activeTime")) || 0;
    let lastDate = localStorage.getItem("lastDate") || getTodayDate();
    let timerInterval;

   
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

    
    function getTodayDate() {
      const now = new Date();
      return now.toISOString().split('T')[0];
    }

 
    function updateTime() {
      const currentDate = getTodayDate();

      
      if (currentDate !== lastDate) {
        totalTime = 0;
        lastDate = currentDate;
        localStorage.setItem("lastDate", lastDate);
      }

      totalTime += 1000;
      localStorage.setItem("activeTime", totalTime);
      document.getElementById("time").innerText = formatTime(totalTime);
    }

  
    window.addEventListener("load", () => {
      document.getElementById("time").innerText = formatTime(totalTime);
      timerInterval = setInterval(updateTime, 1000);
    });

   
    window.addEventListener("beforeunload", () => {
      clearInterval(timerInterval);
      localStorage.setItem("activeTime", totalTime);
      localStorage.setItem("lastDate", lastDate);
    });
