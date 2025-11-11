import catToyIconUrl from "./cat-toy.webp";
import catIconUrl from "./cat.png";
import meowSoundUrl from "./meow.mp3";
import milkIconUrl from "./milk.png";
import mouseIconUrl from "./mouse.png";
import tunaIconUrl from "./tuna.webp";
import yarnIconUrl from "./yarn.webp";

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
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Milk",
    cost: 10,
    rate: 0.1,
    owned: 0,
    icon: milkIconUrl,
    description: "A refreshing treat for cats!",
  },
  {
    name: "Yarn",
    cost: 100,
    rate: 2,
    owned: 0,
    icon: yarnIconUrl,
    description: "Cats love to play with yarn!",
  },
  {
    name: "Mouse",
    cost: 1000,
    rate: 50,
    owned: 0,
    icon: mouseIconUrl,
    description: "Cats eat mice.",
  },
  {
    name: "Cat Toy",
    cost: 5000,
    rate: 100,
    owned: 0,
    icon: catToyIconUrl,
    description: "Ultimate entertainment!",
  },
  {
    name: "Tuna",
    cost: 10000,
    rate: 200,
    owned: 0,
    icon: tunaIconUrl,
    description: "Delicious fish boosts energy!",
  },
];

//counter
let counter: number = 0;
let growthRate: number = 0;

const itemButtonsHTML = availableItems
  .map(
    (item) => `
      <div class="item-row">
        <button id="buy-${item.name}" disabled>
          <p>${item.name} Owned: <span id="${item.name}-owned">0</span></p>
          <img src="${item.icon}" class="icon" />
          <p>Buy ${item.name}: <span id="${item.name}-cost">${item.cost}</span></p>
        </button>
        <div class="description">
          ${item.description}
        </div>
      </div>
    `,
  ).join("");

document.body.innerHTML = `
 <div class="container">
  <div class="left">
    <div class="cat-info">
      <b><div>Cats: <span id="counter">0</span></div></b>
      <div style="font-size: 50%"><span id="growthRate">0</span> cats/sec</div>
    </div>

    <button id="increment">
      <img src="${catIconUrl}" class="cat-icon" />
    </button>
  </div>

  <div class="right">
    <p>Items:</p>
    ${itemButtonsHTML}
  </div>
</div>
`;
const container = document.querySelector(".container") as HTMLElement;

//Add click handler
const button = document.getElementById("increment")!;

const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growthRate")!;

const meowSound = new Audio(meowSoundUrl);

button.addEventListener("click", (ev) => {
  counter += 1;
  meowSound.currentTime = 0;
  meowSound.play();
  updateDisplay();

  const rect = button.getBoundingClientRect();
  const x = ev.clientX ?? rect.left + rect.width / 2;
  const y = ev.clientY ?? rect.top + rect.height / 2;
  showFloatingText(1, x, y);
});

availableItems.forEach((item) => {
  const buyButton = document.getElementById(
    `buy-${item.name}`,
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

  availableItems.forEach((item) => {
    const costElement = document.getElementById(`${item.name}-cost`)!;
    const ownedElement = document.getElementById(`${item.name}-owned`)!;
    const buyButton = document.getElementById(
      `buy-${item.name}`,
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

//floating text inspired by wendyzh05

function showFloatingText(amount: number, x: number, y: number) {
  const el = document.createElement("div");
  el.className = "floating-text";
  el.textContent = `+${amount.toFixed(1)}`;

  const rect = container.getBoundingClientRect();
  // Offset so it appears centered near click
  el.style.left = `${x - rect.left - 10}px`;
  el.style.top = `${y - rect.top - 20}px`;
  container.appendChild(el);

  el.addEventListener("animationend", () => el.remove());
}
