const DAILY_HOURS = 24;
const INTERVAL = 15;
const HOURLY_MINUTES = 60;
const HR_INDICATOR_CLASS = ".hr-indicator";
let unitsIndicatorEl, remainingEl, passedEl, hoursEls, minutesLevelEl;

main();

function main() {
  unitsIndicatorEl = document.querySelector(".units-indicator");
  remainingEl = document.querySelector('[data-key="remaining"]');
  passedEl = document.querySelector('[data-key="passed"]');
  hoursEls = document.querySelectorAll(".hr");
  minutesLevelEl = document.querySelector(".minutes-level");
  onTick();
  window.setInterval(onTick, 5000);
}

function onTick() {
  const today = new Date();
  const currHour = today.getHours();
  const hoursRemaining = DAILY_HOURS - today.getHours() - 1;
  const minutesModulo = today.getMinutes() % INTERVAL;
  const minutesCounting = (INTERVAL - minutesModulo) % INTERVAL;
  const minutesRemainingModulo =
    (HOURLY_MINUTES - today.getMinutes()) % INTERVAL;
  const minutesRemaining =
    HOURLY_MINUTES - today.getMinutes() - minutesRemainingModulo;
  remainingEl.innerHTML = `${hoursRemaining}hr ${minutesRemaining}m ${minutesCounting}m`;
  passedEl.textContent = `${today.getHours()} hrs`;

  const passedInMinutes = currHour * 60 + today.getMinutes();
  const heightOfIndicator = (passedInMinutes / (DAILY_HOURS * 60)) * 100;
  const widthOfMinutesLevel = ((INTERVAL - minutesModulo) / INTERVAL) * 100;

  unitsIndicatorEl.style.height = `${heightOfIndicator}%`;
  minutesLevelEl.style.width = `${widthOfMinutesLevel}%`;

  hoursUpdater(currHour, today.getMinutes());
}

function hoursUpdater(currHour, currMin) {
  const minutesPercentage = (currMin / 60) * 100;
  hoursEls.forEach((hrEl) => {
    let hr = parseInt(hrEl.dataset.key);
    const currHrIndicator = hrEl.querySelector(HR_INDICATOR_CLASS);
    if (currHrIndicator) hrEl.removeChild(currHrIndicator);
    if (currHour < hr) {
      hrEl.style.backgroundColor = "transparent";
      const child = hrEl.querySelector(".hr-indicator");
      if (child) hrEl.removeChild(child);
    }

    if (currHour === hr) {
      const child = document.createElement("div");
      child.setAttribute("class", "hr-indicator");
      child.style.height = `${minutesPercentage}%`;
      child.textContent = currMin + "m";
      hrEl.appendChild(child);
    }
    if (currHour > hr) hrEl.style.backgroundColor = "lightgray";
  });
}
