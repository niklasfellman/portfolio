function getRandom(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

let canvas = document.querySelector("#canvas")
let c = canvas.getContext("2d")
let width = 800
let height = 800
let columns =50
let strokeWeight = 12
canvas.width = width
canvas.height = height

let mouse = {
    x: 0,
    y: 0
}

function directionHelper(n, x, y) {
    switch (n) {
        case 0:
            x++
            break;
        case 1:
            y++
            break;
        case 2:
            x--
            break;
        case 3:
            y--
            break;
    }

    return [x, y]

}

function chooseDirection(x, y, set) {
    let arr = [0, 1, 2, 3]
    let result = []
    let temp;
    let rand
    let number;
    for (let i = arr.length - 1; i > 0; i--) {
        rand = getRandom(0, i)
        temp = arr[rand]
        arr[rand] = arr[i]
        arr[i] = temp
    }

    for (let i = 0; i < 5; i++) {
        if (arr.length >= 1) {
            number = arr.pop()
        } else {
            return ""
        }
        result = directionHelper(number, x, y)
        if (result[0] < 0 || result[1] < 0 || result[0] >= columns || result[1] >= columns || set.has(`${result[0]},${result[1]}`)) {
            continue;
        } else {
            break;
        }
    }
    return result
}


let visitedSet = new Set()
visitedSet.add("0,0")
let visitedStack = [
    [0, 0]
]
let current = [0, 0]
let previous
let direction;
c.fillStyle = "hsla(0,0%,50%,1)"
c.fillRect(current[0] * width / columns, current[1] * width / columns, width / columns, width / columns)
let i = 0;

function animate() {
    if (visitedStack.length > 0) {
        direction = chooseDirection(current[0], current[1], visitedSet)
        if (direction === "") {
            previous = current
            current = visitedStack.pop()
        } else {
            previous = current
            current = direction
            visitedSet.add(`${current[0]},${current[1]}`)
            visitedStack.push([current[0], current[1]])
            c.fillStyle = "hsla(0,0%,30%,1)"
            c.fillRect(current[0] * width / columns, current[1] * width / columns, width / columns, width / columns)
            c.strokeStyle = "hsla(0,0%,80%,1)"
            c.lineCap = "square"
            c.beginPath()
            c.lineWidth = strokeWeight
            c.moveTo((previous[0] * width / columns) + (width / columns) / 2, previous[1] * width / columns + (width / columns) / 2)
            c.lineTo((current[0] * width / columns) + (width / columns) / 2, current[1] * width / columns + (width / columns) / 2)
            c.stroke()
        }
   requestAnimationFrame(animate)
    }
    if(visitedStack.length === 0){console.log("done")}
}

animate()