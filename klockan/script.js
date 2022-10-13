function getRandom(min, max) {
  return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min) + 1) + Math.floor(min));
}

const board = document.querySelector(".board")
const assignment = document.querySelector(".assignmentTime")
const domScore = document.querySelector(".score")
const settings = document.querySelector(".settings-page")
const settingsButton = document.querySelector(".settings-button")
let settingsBoxes = document.querySelectorAll(".settings-box")
console.log(settingsBoxes)

const root = document.documentElement;
root.style.setProperty("--minute-hand-deg", "180deg")
root.style.setProperty("--hour-hand-deg", "-90deg")

function hourToDeg(h) {
  return (h * 30) - 90
}

let setting = "11110"

function settingsMinutes(s) {
  if(s === "10000"){
    return getRandom(0,0)
  }
  else if(s === "11000"){
    return getRandom(0,1)*30
  }
  else if(s === "01000"){
    return getRandom(1,1)*30
  }
  else if(s === "11100"){
    return getRandom(0,3)*15
  }
  else if(s === "00100"){
    return Math.random() > 0.5? 15 : 45
  }
  else if(s === "01100"){
    return getRandom(1,3)*15
  }
  else if(s ==="01110"){
    return getRandom(1,11)*5
  }
  else if(s === "11110" || s === "00010"){
    return getRandom(0,11)*5
  }
  else if(s === "11111" ||setting === "00001"){
    return getRandom(0,59)
  }
  else{return getRandom(0,11)*5}
}

class Clock {
  constructor(m, h, id = 0) {
    this.time = {
      minute: m,
      hour: h
    };
    this.dom = document.createElement("div");
    this.dom.dataset.id = id;
    this.dom.classList.add("clock");
    let clockMiddle = document.createElement("div");
    clockMiddle.classList.add("clock-middle");
    clockMiddle.dataset.id = id;
    this.dom.append(clockMiddle);
    let clockMarkersOne = document.createElement("div");
    clockMarkersOne.classList.add("clock-face");
    clockMarkersOne.dataset.id = id;
    this.dom.append(clockMarkersOne);
    let clockMarkersTwo = document.createElement("div");
    clockMarkersTwo.classList.add("clock-face");
    clockMarkersTwo.dataset.id = id;
    clockMarkersTwo.classList.add("onetwoseveneight");
    this.dom.append(clockMarkersTwo);
    let clockMarkersThree = document.createElement("div");
    clockMarkersThree.classList.add("clock-face");
    clockMarkersThree.dataset.id = id;
    clockMarkersThree.classList.add("fourfiveteneleven");
    this.dom.append(clockMarkersThree);
    let hourHand = document.createElement("div");
    hourHand.classList.add("hour-hand");
    hourHand.dataset.id = id;
    hourHand.style.transform = `translate(3.5vmin) rotate(${(h * 30) - 90}deg)`;
    this.dom.append(hourHand);
    let minuteHand = document.createElement("div");
    minuteHand.classList.add("minute-hand");
    minuteHand.style.transform = `translate(4vmin) rotate(${(m * 6) - 90}deg)`;
    minuteHand.dataset.id = id;
    this.dom.append(minuteHand);
  }
}

function timeStamps(h, m) {
  let result = ""
  if (m === 30) {
    return `halv ${h}`
  } else if (m === 0) {
    return `jämnt ${h}`
  } else if (m < 30) {
    return m === 15? `kvart över ${h}`:`${m} över ${h}`
  } else if (m > 30) {
    return m === 45 ? `kvart före ${h}`:`${60 - m} före ${h}`
  }
  return result
}

let arr = []
let assignmentRan;
let assignmentTime;
let score = 0
let attempts = 0



function createRound(s) {
  for (let i = 0; i < 6; i++) {
    arr.push(new Clock(settingsMinutes(s), getRandom(1, 12), i))
    //! - - arr.push(new Clock(getRandom(0, 11) * 5, getRandom(1, 12), i))
  }
  assignmentRan = getRandom(0, arr.length - 1)
  assignmentTime = arr[assignmentRan].time
  assignment.innerText = `${timeStamps(assignmentTime.hour,assignmentTime.minute)}`
  for (let i = 0; i < arr.length; i++) {
    board.append(arr[i].dom)
  }
}

let rightWrong = document.querySelector(".right-wrong")
function showRightWrong(x){
rightWrong = document.createElement("div")
rightWrong.className="right-wrong"
rightWrong.innerText = x === 0 ? "pröva igen" : "rätt!"
document.body.appendChild(rightWrong)
}

createRound(setting)
board.addEventListener("click", (e) => {
  

  if(e.target.dataset?.id){
  let clicked = (e.target.dataset.id)

  console.log(arr[clicked].time)
  console.log(assignmentTime)

  if (arr[clicked].time.minute === assignmentTime.minute && arr[clicked].time.hour === assignmentTime.hour) {
rightWrong.remove()
showRightWrong(1) 
for (let i = 0; i < arr.length; i++) {
      arr[i].dom.remove()
    }
    arr = []
  score ++
  attempts ++
    createRound(setting)
  }
  else{
rightWrong.remove()
showRightWrong(0)
arr[clicked].dom.style.boxShadow = "0 0 0 0.3vmin black,0 0 0 1.5vmin red,0 0 0 2vmin black"
    attempts ++
  }
  }
  domScore.innerText = `${score}/${attempts} - ${Math.floor((score / attempts) * 100)}% `
})

settingsButton.addEventListener("click", ()=>{
  settings.classList.toggle("visible")
})

settings.addEventListener("click", (x)=>{
  console.log(x)
  let tempSetting = ""
  for (let x of settingsBoxes){
    console.log(x.checked)
    if(x.checked){
      tempSetting+="1"
    }
    else{
      tempSetting+="0"
    }
  }
  setting = tempSetting

  for(let i = 0;i<arr.length;i++){
    arr[i].dom.remove()
  }
  arr = []
  createRound(tempSetting)

})