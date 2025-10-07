import catIconUrl from "./cat.png";
import milkIconUrl from "./milk.png";
import "./style.css";

//counter
let counter: number = 0;
let growthRate: number = 0;

document.body.innerHTML = `
  <p>Cats: <span id="counter">0</span></p>
  <button id="increment"><img src="${catIconUrl}" class="icon" />
  </button>
  <header> Items: </header>
  <button id="buyMilk" disabled> <img src="${milkIconUrl}" class="icon" /> </button>
`;

//Add click handler
const button = document.getElementById("increment")!;
const milkButton = document.getElementById("buyMilk")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
});

milkButton.addEventListener("click", () => {
  counter -= 10;
  growthRate += 1;
  updateDisplay();
});

//Update Counter Display
function updateDisplay() {
  const intCounter = Math.floor(counter);
  counterElement.textContent = intCounter.toString();

  milkButton.disabled = intCounter < 10;
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
