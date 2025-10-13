import catIconUrl from "./cat.png";
import milkIconUrl from "./milk.png";
import yarnIconUrl from "./yarn.webp";
import mouseIconUrl from "./mouse.png";
import meowSoundUrl from "./meow.mp3";

import "./style.css";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap";
document.head.appendChild(fontLink);

//counter
let counter: number = 0;
let growthRate: number = 0;
let milkCost: number = 10;
let yarnCost: number = 100;
let mouseCost: number = 1000;
let milkOwned: number = 0;
let yarnOwned: number = 0;
let mouseOwned: number = 0;

document.body.innerHTML = `
  <style>
    body {
      text-align: center;
      font-size: 300%;
      font-family: 'Comic Neue', sans-serif;
      background-color: #fff8e7; /* light cream color */
      color: #333;
    }

    .icon {
      border: none;
      outline: none;
      width: 64px;
      height: 64px;
    }
    
    .cat-icon {
      width: 240px;
      height: 240px;
    }

    button {
      background-color: #fce4ec; 
      border: 2px solid #fce4ec;
      border-radius: 10px;
      padding: 10px;
      margin: 10px;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>

  <body>
    <header>
    <b><div>Cats: <span id="counter">0</span></div></b>
    <div style="font-size: 50%"><span id="growthRate">0</span> cats/sec</div>
    
    </header>
  </body>
  

  <button id="increment"><img src="${catIconUrl}" class="cat-icon" />
  </button>
  <p> Items: </p>
  <button id="buyMilk" disabled>
    <p style="color: Black">Milk Owned: <span id="milkOwned">0</span></p>
    <img src="${milkIconUrl}" class="icon" /> 
    <p style="color: Black">Buy Milk: <span id="milkCost">10</span></p>
  </button>
  
  <button id="buyYarn" disabled>
    <p style="color: Black">Yarn Owned: <span id="yarnOwned">0</span></p>
    <img src="${yarnIconUrl}" class="icon" /> 
    <p style="color: Black">Buy Yarn: <span id="yarnCost">100</span></p> 
  </button>

  <button id="buyMouse" disabled>
    <p style="color: Black">Mouse Owned: <span id="mouseOwned">0</span></p>
    <img src="${mouseIconUrl}" class="icon" /> 
    <p style="color: Black">Buy Mouse: <span id="mouseCost">1000</span></p> 
  </button>

  `;

//Add click handler
const button = document.getElementById("increment")!;
const milkButton = document.getElementById("buyMilk")! as HTMLButtonElement;
const yarnButton = document.getElementById("buyYarn")! as HTMLButtonElement;
const mouseButton = document.getElementById("buyMouse")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growthRate")!;
const milkCostElement = document.getElementById("milkCost")!;
const yarnCostElement = document.getElementById("yarnCost")!;
const mouseCostElement = document.getElementById("mouseCost")!;
const milkOwnedElement = document.getElementById("milkOwned")!;
const yarnOwnedElement = document.getElementById("yarnOwned")!;
const mouseOwnedElement = document.getElementById("mouseOwned")!;
const meowSound = new Audio(meowSoundUrl);

button.addEventListener("click", () => {
  counter += 1;
  meowSound.currentTime = 0;
  meowSound.play();
  updateDisplay();
});

milkButton.addEventListener("click", () => {
  counter -= milkCost;
  milkCost = milkCost * 1.15;
  growthRate += 0.1;
  milkOwned += 1;
  updateDisplay();
});

yarnButton.addEventListener("click", () => {
  counter -= yarnCost;
  yarnCost = yarnCost * 1.15;
  growthRate += 2;
  yarnOwned += 1;
  updateDisplay();
});

mouseButton.addEventListener("click", () => {
  counter -= mouseCost;
  mouseCost = mouseCost * 1.15;
  growthRate += 50;
  mouseOwned += 1;
  updateDisplay();
});

//Update Counter Display
function updateDisplay() {
  const intCounter = Math.floor(counter);
  counterElement.textContent = intCounter.toString();

  const intGrowth = Math.round(growthRate * 100) / 100; //rounds to 2 decimals
  growthElement.textContent = intGrowth.toString();

  const milkCounter = Math.round(milkCost * 100) / 100;
  milkButton.disabled = intCounter < milkCounter;
  milkCostElement.textContent = milkCounter.toString();

  const yarnCounter = Math.round(yarnCost * 100) / 100;
  yarnButton.disabled = intCounter < yarnCounter;
  yarnCostElement.textContent = yarnCounter.toString();

  const mouseCounter = Math.round(mouseCost * 100) / 100;
  mouseButton.disabled = intCounter < mouseCounter;
  mouseCostElement.textContent = mouseCounter.toString();

  milkOwnedElement.textContent = milkOwned.toString();
  yarnOwnedElement.textContent = yarnOwned.toString();
  mouseOwnedElement.textContent = mouseOwned.toString();
}

//Animation using requestAnimationFrame
let lastTime: number | null = null;

function animate(currentTime: number) {
  if (lastTime !== null) {
    const deltaTime = (currentTime - lastTime) / 1000;
    counter += deltaTime * growthRate;
    updateDisplay();
  }
  lastTime = currentTime;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
