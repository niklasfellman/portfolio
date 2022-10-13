console.log("eyoo")

let links = document.querySelectorAll(".link")
let board = document.querySelector(".container")

console.log(links)

for(let i = 0;i<links.length;i++){

	let rotation = (Math.random() - Math.random()) * -8
	let hueNumber = Math.floor(Math.random() * 255)
	let margin = Math.floor(Math.random() * 100)
	links[i].style.transform = `rotate(${rotation}deg)`
	links[i].style.border = `4px solid hsl(${hueNumber},100%,80%)`
}


board.addEventListener("click",(x)=>{

	console.log(x)
})
