const startBtn = document.querySelector(".start-btn")
const trailBtn = document.querySelector(".trail-btn")
const hueSlider = document.querySelector("#hue-slider")
const hueSliderLabel = document.querySelector("#hue-slider-value")
const saturationSlider = document.querySelector("#saturation-slider")
const saturationSliderLabel = document.querySelector("#saturation-slider-value")
const lightSlider = document.querySelector("#light-slider")
const lightSliderLabel = document.querySelector("#light-slider-value")
const slidersContainer = document.querySelector(".sliders-container")
const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")

console.log(slidersContainer)


let height = 600;
let widthToHeightRatio = 2.5
let width = height * widthToHeightRatio 
canvas.width = width
canvas.height = height
let resolution = 120

let trail = false
let saturationMultiplier = 1
let lightMultiplier = .5
let hue = 20

hueSlider.value = hue
hueSliderLabel.innerText = hueSlider.value

class Cell{
	constructor(x,y){
		this.x = x
		this.y = y
		this.alive = Math.random() * Math.random() > .65 ? true:false
		this.previous = this.alive
		this.neighbors = 0
		this.next = true	
		this.timeSinceAlive = 0
		}

	display(){
	//	c.fillStyle = this.alive ? "white" : "black"
		
		trail ? c.fillStyle = `hsl(${hue},${this.timeSinceAlive * saturationMultiplier }%,${100 - this.timeSinceAlive * lightMultiplier }%)` : c.fillStyle = this.alive ? "white" : "black"

		c.fillRect(this.x * (width/(resolution*(width/height))),this.y*height/resolution,height/resolution,height/resolution)	
		this.deadOrAlive()
		this.updateTimeAlive()
	}

	updateNeighbors(x){
		if(this.alive){x = x-1}
		this.neighbors = x
	}

	deadOrAlive(){

		if(this.alive && this.neighbors === 2 || this.neighbors === 3){
			this.next = true
		}
		else{
			this.next = false
		}
	}

	updateTimeAlive(){
		if(!this.alive){
		this.timeSinceAlive ++
		}
		if(this.alive){
		this.timeSinceAlive = 0
		}
	}
}

let boardArr = []

for(let i = 0;i<resolution * (width / height);i++){
	boardArr.push([])
	for(let j = 0;j<resolution;j++){
		boardArr[i].push(new Cell(i,j))
		boardArr[i][j].display()
	}
}

console.log(boardArr)


let columns = resolution * widthToHeightRatio
let rows = resolution
 
let previousTime
let animationID

function animate(time){
	animationID = requestAnimationFrame(animate)
//console.log(time - previousTime)
// ~ 60ms with two loops 100 resolution
// ~ 250ms with two loops 200 resolution


	if(time - previousTime < 5){
		return
	}
	
	previousTime = time
	
	for(let i = 0;i<boardArr.length;i++){
		for(let j = 0;j<boardArr[i].length;j++){
			let count = 0
// =>=>=>=>=>=>=>=>=>=>=>=>=> CHECK FOR NEIGHBORS <=<=<=<=<=<=<=<=<=<=<=<=<=<=
			for(let k = -1;k<2;k++){
				for(let l  = -1;l<2;l++){
					let current = boardArr[(i+k+columns)%columns][(j+l + rows)%rows]
					if(current.alive){
						count ++	
					}
					}
			}	
// =>=>=>=>=>=>=>=>=>=>=>=>=> =================== <=<=<=<=<=<=<=<=<=<=<=<=<=<=
			boardArr[i][j].updateNeighbors(count)
			boardArr[i][j].display()
		}
	}
// =>=>=>=>=>=>=>=>=> WANT TO TRY TO GET THIS INTO PREVIOUS LOOP <=<=<=<=<=<=<=<=
	for(let i = 0;i<boardArr.length;i++){
		for(let j = 0;j<boardArr[i].length;j++){
			boardArr[i][j].alive = boardArr[i][j].next
		}
	}
}

function stopAnimate(){
	cancelAnimationFrame(animationID)
}


let animating = false
startBtn.addEventListener("click",()=>{
	!animating ? animate() : stopAnimate()
	animating = !animating
})

trailBtn.addEventListener("click",()=>{
	trail = !trail
	trail ? slidersContainer.style.visibility = "visible" : slidersContainer.style.visibility = "hidden"
})

hueSlider.addEventListener("input",()=>{
	hueSliderLabel.innerText = hueSlider.value
	hue = hueSlider.value
})

saturationSlider.addEventListener("input",()=>{
	saturationSliderLabel.innerText = saturationSlider.value
	saturationMultiplier = saturationSlider.value
})

lightSlider.addEventListener("input",()=>{
	lightSliderLabel.innerText = lightSlider.value
	lightMultiplier = lightSlider.value
})
