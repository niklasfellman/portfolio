const links = document.querySelectorAll(".link")
const board = document.querySelector(".container")
const contactBtn = document.querySelector(".contact")
const contactForm = document.querySelector(".contact-container")

links.forEach(link => {
	let rotation = (Math.random() - Math.random()) * -8
	let hueNumber = Math.floor(Math.random() * 255)
	let margin = Math.floor(Math.random() * 100)
	link.style.transform = `rotate(${rotation}deg)`
	link.style.border = `4px solid hsl(${hueNumber},100%,75%)`
})

contactBtn.addEventListener("click", (x)=>{
	contactForm.classList.toggle("hidden")
})
