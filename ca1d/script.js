const resultCells = document.querySelectorAll(".result")
const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")
const newBtn = document.querySelector(".new")
const caseSlider = document.querySelector(".case-slider")
const ruleTitle = document.querySelector(".rule-number")
const nextBtn = document.querySelector(".next")
const previousBtn = document.querySelector(".previous")
const randomSeedCheckBox = document.querySelector("#random-seed")

const resolutionSlider = document.querySelector(".resolution-slider")

canvas.width = 1000
canvas.height = 1000
let height = canvas.height
let width = canvas.width

caseSlider.value = 30
let caseNumber = parseInt(caseSlider.value)
ruleTitle.innerText = `Rule ${caseNumber}`
let resolution = parseInt(resolutionSlider.value)
let randomSeed = false

class Cell{
	constructor(x,y,res = 10,alive = false){
		this.x = x;
		this.y = y;
		this.random = Math.random()
		this.resolution = res
		this.alive = alive	
	}

	displayCell(){
		c.fillStyle = this.alive ? "#000" : "white"
		c.fillRect(this.y * width/this.resolution,this.x * height/this.resolution,width/this.resolution,height/this.resolution)
	}
}

class Board{
	constructor(res = 100,ruleN = 30){
		this.resolution = res % 2 === 0 ? res + 1 : res
		this.grid = []
		this.ruleN = (ruleN).toString(2).padStart(8,"0")
		this.rule = {
			"111" : this.ruleN[0],	
			"110" : this.ruleN[1],	
			"101" : this.ruleN[2],	
			"100" : this.ruleN[3],	
			"011" : this.ruleN[4],	
			"010" : this.ruleN[5],	
			"001" : this.ruleN[6],	
			"000" : this.ruleN[7],	
		}

		for(let i = 0;i<1;i++){
			this.grid.push([])
			for(let j = 0;j<this.resolution;j++){
				//this.grid[i].push(new Cell(i,j,this.resolution,(j == Math.floor(this.resolution/2))))	
				this.grid[i].push(new Cell(i,j,this.resolution,(randomSeed ? Math.random() < .5 :(j == Math.floor(this.resolution/2))))) 	
			}
		}
	}

	display(){
		for(let i = 0;i<this.grid.length;i++){
			for(let j = 0;j<this.grid[i].length;j++){
				this.grid[i][j].displayCell()
			}
		}	
	}		

	update(){
		let arr = [false]
		for(let i = 1;i<this.grid[this.grid.length-1].length-1;i++){
			let current = ""
			for(let j = -1;j<2;j++){
				this.grid[this.grid.length-1][i + j].alive ? current += "1": current += "0"
			}			
			
		
		this.rule[current]==="1" ? arr.push(true) : arr.push(false)		

		}
		this.grid.push([])
		for(let i = 0;i<this.resolution;i++){
			this.grid[this.grid.length-1].push(new Cell(this.grid.length-1,i,this.resolution,arr[i]))
		}	
	}
}

let board;
function createBoard(resolution,caseN){
	let ruleBinary = (caseN).toString(2).padStart(8,"0").split("")
	for(let i = 0;i<resultCells.length;i++){
		resultCells[i].style.backgroundColor = ruleBinary[i] === "1" ? "#444" : "white"
	}	
	c.clearRect(0,0,width,height)
	let board = new Board(resolution,caseN)
	for(let i = 0;i<resolution;i++){
		board.update()
	}
	board.display()
}

	createBoard(parseInt(resolutionSlider.value),caseNumber)	

newBtn.addEventListener("click",()=>{
	createBoard(parseInt(resolutionSlider.value),caseNumber)	
	ruleTitle.innerText = `Rule ${caseNumber}`
})

nextBtn.addEventListener("click",()=>{
	if(caseNumber === 255){return}
	caseNumber ++
	caseSlider.labels[1].innerText = caseNumber
	caseSlider.value= caseNumber
	createBoard(parseInt(resolutionSlider.value),caseNumber)	
	ruleTitle.innerText = `Rule ${caseNumber}`
})

previousBtn.addEventListener("click",()=>{
	if(caseNumber === 0){return}
	caseNumber --
	caseSlider.labels[1].innerText = caseNumber
	caseSlider.value= caseNumber
	createBoard(parseInt(resolutionSlider.value),caseNumber)	
	ruleTitle.innerText = `Rule ${caseNumber}`
})

caseSlider.addEventListener("input",(x)=>{
	caseNumber = parseInt(x.target.value)
	caseSlider.labels[1].innerText = caseNumber
})

resolutionSlider.addEventListener("input",(x)=>{
	resolutionSlider.labels[1].innerText = resolutionSlider.value	
})

randomSeedCheckBox.addEventListener("click",(x)=>{
	console.log(x)
	if(x.target.checked){randomSeed = true}
	if(!x.target.checked){randomSeed = false}

	createBoard(parseInt(resolutionSlider.value),caseNumber)	


	
})

