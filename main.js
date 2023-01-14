const DAILY_UNITS = 96
let unitsIndicatorEl, completedEl, remainingEl 

main()

function main() {
    unitsIndicatorEl = document.querySelector(".units-indicator")
    completedEl = document.querySelector('[data-key="completed"]')
    remainingEl = document.querySelector('[data-key="remaining"]')

    onTick()
    window.setInterval(onTick, 5000)
}


function onTick() {
    const today =  new Date()
    const hoursUnit = today.getHours() * 4
    const minutesUnits = parseInt(today.getMinutes()/15)
    const completedUnits = hoursUnit + minutesUnits
    const remainingUnits = DAILY_UNITS - completedUnits
    console.log(completedUnits, remainingUnits)    
    completedEl.textContent = completedUnits
    remainingEl.textContent = remainingUnits

    const heightOfIndicator = (completedUnits/DAILY_UNITS) * 100 
    unitsIndicatorEl.style.height = `${heightOfIndicator}%` 
}
