let links = document.querySelectorAll(".link")
let board = document.querySelector(".container")

for(let i = 0;i<links.length;i++){
	let rotation = (Math.random() - Math.random()) * -8
	let hueNumber = Math.floor(Math.random() * 255)
	let margin = Math.floor(Math.random() * 100)
	links[i].style.transform = `rotate(${rotation}deg)`
	links[i].style.border = `4px solid hsl(${hueNumber},100%,80%)`
}



/*
for(let i = 0;i<links.length;i++){
	links[i].addEventListener("mouseover",(x)=>{
		console.log(x.target)
		console.log(toolTip.offsetTop)
		
		toolTip.style.top = x.target.offsetTop + "px"
		toolTip.style.left = x.target.offsetLeft + "px"

	})
}
*/
