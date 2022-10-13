let size = 50
const root = document.documentElement;
root.style.setProperty("--boardsize", size)

const board = document.querySelector("#board")

console.log(board)

let cell = document.createElement("div")

let arr = []

for (let i = 0; i < size; i++) {
    arr.push([])
    for (let j = 0; j < size; j++) {
        arr[i].push(document.createElement("div"))
        arr[i][j].classList.add("cell")
        arr[i][j].setAttribute("data-position", `${i}-${j}`)
        board.append(arr[i][j])
    }
}

class Apple {
    constructor() {
        this.position = {
            x: Math.floor(Math.random() * size),
            y: Math.floor(Math.random() * size)
        }
    }

    display(arr){
        arr[this.position.x][this.position.y].classList.add("apple")
    }

}

class Snake {
    constructor() {
        this.size = 1
        this.velocity = {
            x: 0,
            y: 0
        }
        this.position = [{
            x: 5,
            y: 5
        }]
        this.prevPosition = []
        this.dead = false
        this.prevDirection = ""
    }

    goLeft() {
        this.velocity = {
            x: 0,
            y: -1
        }
    }
    goRight() {
        this.velocity = {
            x: 0,
            y: 1
        }
    }
    goDown() {
        this.velocity = {
            x: 1,
            y: 0
        }
    }
    goUp() {
        this.velocity = {
            x: -1,
            y: 0
        }
    }

    ateApple() {
        this.position.push(this.position[this.position.length - 1])
    }

    update() {
        for (let i = this.position.length - 2; i >= 0; i--) {
            this.position[i + 1] = {
                ...this.position[i]
            }
        }
        this.position[0].x += this.velocity.x
        this.position[0].y += this.velocity.y
for (let i = 1; i < this.position.length; i++) {
            if (
                this.position[0].x === this.position[i].x &&
                this.position[0].y === this.position[i].y
            ) {
                console.log("ran into itself")
                this.dead = true
            }}

    
        if (this.position[0].x < 0 ||
        this.position[0].x > size - 1 ||
        this.position[0].y < 0 ||
        this.position[0].y > size - 1
    ) {
        if(this.position.length > 1){

        
        this.position[0].x = this.position[1].x
        this.position[0].y = this.position[1].y
        }
        this.dead = true
        console.log("ran into wall")
    }

    }

    display(arr) {
              this.update()
        for (let i = 0; i < this.position.length; i++) {
           
            arr[this.position[i].x][this.position[i].y]?.classList.add("snake")
        } 
    }
}
let snake = new Snake()
let appleBasket = [new Apple()]

let previousTime;

function gameOver() {
    console.log("ran into wall")
    //root.style.setProperty("--cellColor", "rgb(105, 138, 113)")
    //root.style.setProperty("--snake", "rgb(188, 219, 243)")
}

let moveQue = []

function animate(time) {
    if(snake.dead){
        gameOver()
        return
    }

    window.requestAnimationFrame(animate)
    if (time - previousTime < 70) {
        return
    }

    previousTime = time




    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            arr[i][j].classList.remove("snake")
        }
    }

    nextMove()

    snake.display(arr)
    if(snake.position[0].x === appleBasket[0].position.x && snake.position[0].y === appleBasket[0].position.y){
        console.log("apple")
        snake.ateApple()
        arr[appleBasket[0].position.x][appleBasket[0].position.y].classList.remove("apple")
        appleBasket.pop()
        appleBasket.push(new Apple())
    }
    for (let apple of appleBasket){
        apple.display(arr)
    }

}

function nextMove(){

    current = moveQue.shift()

if ((current === "ArrowLeft" || current === "a") && (this.prevDirection != "ArrowRight" && this.prevDirection != "d")) {
        (snake.goLeft())
        this.prevDirection = current
    } else if ((current === "ArrowRight" || current === "d") && (this.prevDirection != "ArrowLeft" && this.prevDirection != "a") ) {
        (snake.goRight())
        this.prevDirection = current
    } else if ((current === "ArrowUp" || current === "w") && this.prevDirection != "ArrowDown" && this.prevDirection != "s") {
        (snake.goUp())
        this.prevDirection = current
    } else if ((current === "ArrowDown" || current === "s") && this.prevDirection != "ArrowUp" && this.prevDirection != "w") {
        (snake.goDown())
        this.prevDirection = current
    } else {
        ""
    }

}

addEventListener("keydown", (e) => {


    if(moveQue[moveQue.length-1]!=e.key) {
    moveQue.push(e.key)
    }   

})

animate()