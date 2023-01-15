const DAILY_HOURS = 24
const INTERVAL = 15
const HOURLY_MINUTES = 60
let unitsIndicatorEl, remainingEl, passedEl 

main()

function main() {
    unitsIndicatorEl = document.querySelector(".units-indicator")
    remainingEl = document.querySelector('[data-key="remaining"]')
    passedEl = document.querySelector('[data-key="passed"]')

    onTick()
    window.setInterval(onTick, 5000)
}


function onTick() {
    const today =  new Date()
    const hoursRemaining = DAILY_HOURS - today.getHours()  
    const minutesModulo = today.getMinutes() % INTERVAL 
    const minutesCounting = INTERVAL - minutesModulo 
    const minutesRemaining = today.getMinutes() - minutesModulo
    remainingEl.innerHTML = `${hoursRemaining}hr ${minutesRemaining}m ${minutesCounting}m`
    passedEl.textContent = `${today.getHours()} hrs`

    const passedInMinutes = (today.getHours() * 60) + today.getMinutes()
    const heightOfIndicator = (passedInMinutes/(DAILY_HOURS * 60)) * 100 
    unitsIndicatorEl.style.height = `${heightOfIndicator}%` 
}
