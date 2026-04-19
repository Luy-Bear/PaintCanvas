let isDragging = false
let lastX = null
let lastY = null



document.addEventListener("mouseup", ()=> {isDragging = false})
document.addEventListener("mousedown", () => {isDragging = true})
document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        let element = document.elementFromPoint(event.clientX, event.clientY)
        if (element && element.classList.contains("Box")) {
            element.style.backgroundColor = chosenColour
        }
    }
})
document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        if (lastX !== null) {
            interpolatePaint(lastX, lastY, event.clientX, event.clientY)
        }
        lastX = event.clientX
        lastY = event.clientY
    }
})

document.addEventListener("mouseup", () => {
    isDragging = false
    lastX = null
    lastY = null
})


let AddBoxBtn = document.querySelector("#AddBoxBtn")
AddBoxBtn.addEventListener("click", AddButtonToDiv)

let RedSlider = document.querySelector("#RedSlider")
let GreenSlider = document.querySelector("#GreenSlider")
let BlueSlider = document.querySelector("#BlueSlider")
RedSlider.addEventListener("input", ()=>setColour(RedSlider.value, GreenSlider.value, BlueSlider.value))
GreenSlider.addEventListener("input", ()=>setColour(RedSlider.value, GreenSlider.value, BlueSlider.value))
BlueSlider.addEventListener("input", ()=>setColour(RedSlider.value, GreenSlider.value, BlueSlider.value))




let chosenColour = "rgb(0, 0, 0)"
setColour(0,0,0)


for(let i = 0; i <1200; i++){
    AddButtonToDiv()
}






function AddButtonToDiv(){
    let BoxDiv = document.querySelector("#BoxDiv")

    let NewBox = document.createElement("div")
    NewBox.className = "Box"
    
    NewBox.addEventListener("mousedown", () => {
    isDragging = true})
    
    NewBox.addEventListener("click", (event) => {
    event.target.style.backgroundColor = chosenColour})

    BoxDiv.insertAdjacentElement("beforeend", NewBox)
    
}




// Takes the previous mouse position (x1, y1) and the current one (x2, y2).
function interpolatePaint(x1, y1, x2, y2) {
    // Calculates the total distance travelled in each axis. For example if you moved from x=100 to x=115, dx is 15.
    let dx = x2 - x1
    let dy = y2 - y1
    // Decides how many points to sample. We take whichever axis moved the most — that's the number of steps we need to guarantee no gaps. For example if dx is 15 and dy is 8, we take 15 steps.
    let steps = Math.max(Math.abs(dx), Math.abs(dy))

    // Loops through each step. t is a value from 0.0 to 1.0 representing how far along the line we are — 0 is the start, 1 is the end. The steps === 0 guard prevents a divide-by-zero if the mouse didn't move.
    for (let i = 0; i <= steps; i++) {
        let t = steps === 0 ? 0 : i / steps
        // Calculates the actual coordinate at this point along the line. At t=0 you get the start, at t=0.5 you get the midpoint, at t=1 you get the end.
        let x = Math.round(x1 + dx * t)
        let y = Math.round(y1 + dy * t)
        // Looks up whatever element is at that coordinate and paints it if it's a Box.
        let element = document.elementFromPoint(x, y)
        if (element && element.classList.contains("Box")) {
            element.style.backgroundColor = chosenColour
        }
    }
}


function setColour(R, G, B){
    let ChosenColourBox = document.querySelector(".ChosenColour")
    chosenColour = "rgb("+R+", "+G+", "+B+")"
    ChosenColourBox.style.backgroundColor =  chosenColour 
}