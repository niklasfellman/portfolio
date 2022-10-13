let board = document.querySelector("#board")

let boardArr = []
let coin = document.querySelector(".coin")



class square {
    constructor(dom, index, color) {
        this.dom = dom;
        this.index = index;
        this.color = color
    }
}

function checkWin(x) {
    let counter = 0
    //check horizontal
    for (let i = 1; i < 7; i++) {
        if (boardArr[x[0]][i].color !== "white" && boardArr[x[0]][i].color === boardArr[x[0]][i - 1].color) {
            counter++
            if (counter === 3) {
                return true
            }
        } else {
            counter = 0
        }
    }
//check vertical
    for (let i = 1; i < 6; i++) {
        if (boardArr[i][x[1]].color !== "white" && boardArr[i][x[1]].color === boardArr[i-1][x[1]].color) {
            counter++
            if (counter === 3) {
                return true
            }
        } else {
            counter = 0
        }
    }

counter = 0 

    let row = x[0] -1
    let col = x[1] +1

    for (let i = 0;i<3;i++){
        if (row < 0 || col > 6){break}
        if (boardArr[x[0]][x[1]].color === boardArr[row][col].color){
            counter ++
            if (counter === 3){return true}
        }
        else{break}
        row --
        col ++
    }
    

    row = x[0] + 1
    col = x[1] - 1
    for (let i = 0 ; i<3;i++){
        if (row > 5 || col < 0){break}
        if (boardArr[x[0]][x[1]].color === boardArr[row][col].color){
            counter ++
            if (counter === 3){return true}
        }
        row ++
        col --
    }
    counter = 0
// ==========================================================
    row = x[0] +1
    col = x[1] +1

    for (let i = 0;i<3;i++){
        if (row > 5 || col > 6){break}
        if (boardArr[x[0]][x[1]].color === boardArr[row][col].color){
            counter ++
            if (counter === 3){return true}
        }
        else{break}
        row ++
        col ++
    }
    

    row = x[0] - 1
    col = x[1] - 1
    for (let i = 0 ; i<3;i++){
        if (row < 0 || col < 0){break}
        if (boardArr[x[0]][x[1]].color === boardArr[row][col].color){
            counter ++
            if (counter === 3){return true}
        }
        row --
        col --
    }


    return false
}

function determineTurn(x) {
    return x % 2 === 0 ? "red" : "yellow"
}


for (let i = 0; i < 6; i++) {

    boardArr.push([])

    for (let j = 0; j < 7; j++) {

        let domSquare = document.createElement("div")
        domSquare.className = "square"
        domSquare.dataset.position = `${i}-${j}`
        boardArr[i].push(new square(domSquare, j, "white"))
        board.append(domSquare)
    }
}


let turn = 1
let checker = 0
board.addEventListener("click", x => {
    pos = x.target.dataset.position.split("-")
    pos[0] = parseInt(pos[0])
    pos[1] = parseInt(pos[1])
    for (let i = boardArr.length - 1; i >= 0; i--) {
        if (boardArr[i][pos[1]].color == "white") {
            boardArr[i][pos[1]].dom.classList.add(determineTurn(turn))
            boardArr[i][pos[1]].color = determineTurn(turn)
            coin.classList.toggle("red")
            turn++
            pos[0] = i
            break
        }
    }

    if (checkWin(pos)){
        console.log("win")
        checker ++
        if (checker === 1){
        board.classList.add(`${determineTurn(turn-1)}-win`)
        }
    }

})

board.addEventListener("mousemove", x => {

    coin.style.left = x.pageX + "px"

})