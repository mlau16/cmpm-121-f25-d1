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

interface Item {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  icon: string;
}

const availableItems: Item[] = [
  { name: "Milk", cost: 10, rate: 0.1, owned: 0, icon: milkIconUrl },
  { name: "Yarn", cost: 100, rate: 2, owned: 0, icon: yarnIconUrl },
  { name: "Mouse", cost: 1000, rate: 50, owned: 0, icon: mouseIconUrl },
];

//counter
let counter: number = 0;
let growthRate: number = 0;

let itemButtonsHTML = availableItems
  .map(
    (item, index) => `
      <button id="buy-${index}" disabled>
        <p>${item.name} Owned: <span id="${item.name}-owned">0</span></p>
        <img src="${item.icon}" class="icon" />
        <p>Buy ${item.name}: <span id="${item.name}-cost">${item.cost}</span></p>
      </button>
    `,
  ).join("");

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

  <p>Items:</p>
  ${itemButtonsHTML}
  `;

//Add click handler
const button = document.getElementById("increment")!;

const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growthRate")!;

const meowSound = new Audio(meowSoundUrl);

button.addEventListener("click", () => {
  counter += 1;
  meowSound.currentTime = 0;
  meowSound.play();
  updateDisplay();
});

availableItems.forEach((item, index) => {
  const buyButton = document.getElementById(
    `buy-${index}`,
  ) as HTMLButtonElement;

  buyButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.cost *= 1.15;
      growthRate += item.rate;
      item.owned += 1;
      updateDisplay();
    }
  });
});

//Update Counter Display
function updateDisplay() {
  const intCounter = Math.floor(counter);
  counterElement.textContent = intCounter.toString();

  const roundedGrowth = Math.round(growthRate * 100) / 100; //rounds to 2 decimals
  growthElement.textContent = roundedGrowth.toString();

  availableItems.forEach((item, index) => {
    const costElement = document.getElementById(`${item.name}-cost`)!;
    const ownedElement = document.getElementById(`${item.name}-owned`)!;
    const buyButton = document.getElementById(
      `buy-${index}`,
    ) as HTMLButtonElement;

    const roundedCost = Math.round(item.cost * 100) / 100;
    costElement.textContent = roundedCost.toString();
    ownedElement.textContent = item.owned.toString();
    buyButton.disabled = counter < item.cost;
  });
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
