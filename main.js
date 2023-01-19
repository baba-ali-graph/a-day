const DAILY_HOURS = 24
const INTERVAL = 15
const HOURLY_MINUTES = 60
let unitsIndicatorEl, remainingEl, passedEl, hoursEls 

main()

function main() {
    unitsIndicatorEl = document.querySelector(".units-indicator")
    remainingEl = document.querySelector('[data-key="remaining"]')
    passedEl = document.querySelector('[data-key="passed"]')
    hoursEls = document.querySelectorAll('.hr')
    onTick()
    window.setInterval(onTick, 5000)
}


function onTick() {
    const today =  new Date()
    const currHour = today.getHours()
    const hoursRemaining = DAILY_HOURS - today.getHours() - 1   
    const minutesModulo = today.getMinutes() % INTERVAL 
    const minutesCounting = INTERVAL - minutesModulo 
    const minutesRemainingModulo = (HOURLY_MINUTES - today.getMinutes())% INTERVAL
    const minutesRemaining = (HOURLY_MINUTES-today.getMinutes()) - minutesRemainingModulo
    remainingEl.innerHTML = `${hoursRemaining}hr ${minutesRemaining}m ${minutesCounting}m`
    passedEl.textContent = `${today.getHours()} hrs`

    const passedInMinutes = (currHour * 60) + today.getMinutes()
    const heightOfIndicator = (passedInMinutes/(DAILY_HOURS * 60)) * 100 
    unitsIndicatorEl.style.height = `${heightOfIndicator}%` 
    hoursUpdater(currHour)
}


function hoursUpdater(currHour) {
    hoursEls.forEach(hrEl => {
        let hr = parseInt(hrEl.dataset.key)
        if(currHour < hr) hrEl.style.backgroundColor = 'transparent'
        if(currHour === hr) hrEl.style.backgroundColor = 'skyblue'
        if(currHour > hr)  hrEl.style.backgroundColor = "lightgray"
    })
}