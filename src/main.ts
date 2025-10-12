import catIconUrl from "./cat.png";
import milkIconUrl from "./milk.png";
import yarnIconUrl from "./yarn.webp";
import mouseIconUrl from "./mouse.png";

import "./style.css";

//counter
let counter: number = 0;
let growthRate: number = 0;
let sellRate1: number = 10;
let sellRate2: number = 100;
let sellRate3: number = 1000;
let milkOwned: number = 0;
let yarnOwned: number = 0;
let mouseOwned: number = 0;

document.body.innerHTML = `
  <head>
    <style>
      body {
        text-align: center;
        font-size: 300%;
        font-family: Courier New"
      }
    </style>
  </head>

  <body>
    <header>
    <b><div>Cats: <span id="counter">0</span></div></b>
    <div style="font-size: 50%"><span id="growthRate">0</span> cats/sec</div>
    
    </header>
  </body>
  

  <button id="increment"><img src="${catIconUrl}" class="icon" />
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

button.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
});

milkButton.addEventListener("click", () => {
  counter -= sellRate1;
  sellRate1 += 10;
  growthRate += 0.1;
  milkOwned += 1;
  updateDisplay();
});

yarnButton.addEventListener("click", () => {
  counter -= sellRate2;
  sellRate2 += 100;
  growthRate += 2;
  yarnOwned += 1;
  updateDisplay();
});

mouseButton.addEventListener("click", () => {
  counter -= sellRate3;
  sellRate3 += 1000;
  growthRate += 50;
  mouseOwned += 1;
  updateDisplay();
});

//Update Counter Display
function updateDisplay() {
  const intCounter = Math.floor(counter);
  counterElement.textContent = intCounter.toString();
  growthElement.textContent = growthRate.toString();

  milkButton.disabled = intCounter < sellRate1;
  milkCostElement.textContent = sellRate1.toString();

  yarnButton.disabled = intCounter < sellRate2;
  yarnCostElement.textContent = sellRate2.toString();

  mouseButton.disabled = intCounter < sellRate3;
  mouseCostElement.textContent = sellRate3.toString();

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
