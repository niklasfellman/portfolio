let numberSquares = 20
class square {
    constructor(number, position, active, flagged, gotBomb) {
        this.number = number;
        this.position = position;
        this.active = active;
        this.flagged = flagged;
        this.gotBomb = gotBomb;
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function placeBomb() {
    return getRandom(1, 100) > 85 ? true : false
}

function checkForBombs(x) {
    let arr = []

    arr.push(boardArr[x[0]][x[1]])
    if (x[0] != 0) {
        arr.push(boardArr[x[0] - 1][x[1]])
    }
    if (x[0] != numberSquares - 1) {
        arr.push(boardArr[x[0] + 1][x[1]])
    }
    if (x[1] != 0) {
        arr.push(boardArr[x[0]][x[1] - 1])
    }
    if (x[1] != numberSquares - 1) {
        arr.push(boardArr[x[0]][x[1] + 1])
    }
    if (x[0] != 0 && x[1] != 0) {
        arr.push(boardArr[x[0] - 1][x[1] - 1])
    }
    if (x[0] != numberSquares - 1 && x[1] != numberSquares - 1) {
        arr.push(boardArr[x[0] + 1][x[1] + 1])
    }
    if (x[0] != 0 && x[1] != numberSquares - 1) {
        arr.push(boardArr[x[0] - 1][x[1] + 1])
    }
    if (x[0] != numberSquares - 1 && x[1] != 0) {
        arr.push(boardArr[x[0] + 1][x[1] - 1])
    }

    let bombs = []

    for (x of arr) {
        if (x.gotBomb == true) {
            bombs.push(x)
        }
    }
    return (bombs)
}


function checkWin(arr) {

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j].active == true) {
                return false
            }
        }
    }
    return true
}

let boardArr = []
let body = document.querySelector("body")
let board = document.querySelector("#board")

board.style.setProperty("--numberSquaresX", numberSquares);
board.style.setProperty("--numberSquaresY", numberSquares);

let number = 0
for (let i = 0; i < numberSquares; i++) {
    boardArr.push([])

    for (let j = 0; j < numberSquares; j++) {
        boardArr[i].push(new square(number, `${i}${j}`, false, false, placeBomb()))
        let newDomSqr = document.createElement("div")
        newDomSqr.className = "square"
        //shows where bombs are, remove later
        if (boardArr[i][j].gotBomb == true) {
            boardArr[i][j].active = true
            //newDomSqr.classList.add("active")
        }
        newDomSqr.setAttribute("data-position", `${i}-${j}`)
        board.appendChild(newDomSqr)
        number++
    }
}



function lostGame(x) {

    let lostP = document.createElement("p")
    lostP.id = "lost"
    lostP.innerText = x
    body.append(lostP)

    let playAgain = document.querySelector("#lost")

    playAgain.addEventListener("click", x => {
        location.reload()
    })

}




let squares = document.querySelectorAll(".square")
console.log(squares[0])

board.addEventListener("click", x => {
    let pos = x.target.dataset.position.split("-").map(x => parseInt(x))
    if (boardArr[pos[0]][pos[1]].gotBomb == true) {
        console.log("lost")
        lostGame("You stepped on a mine - Click to play again");
    }


    arr = checkForBombs(pos)


    if (arr.length === 0) {
        console.log("zero")
    }
    x.target.classList.add("adjecent")
    x.target.innerText = arr.length



})


board.addEventListener("contextmenu", x => {
    x.preventDefault()
    let pos = x.target.dataset.position.split("-").map(x => parseInt(x))
    boardArr[pos[0]][pos[1]].active = !boardArr[pos[0]][pos[1]].active

    x.target.classList.toggle("flagged")

    // x.target.innerText = "🚩"

    if (checkWin(boardArr)) {
        lostGame("You found all the mines - Click to play again")
    }
    console.log(checkWin(boardArr))

})