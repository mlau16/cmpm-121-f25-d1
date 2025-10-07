import exampleIconUrl from "./cat.png";
import "./style.css";

//counter
let counter: number = 0;

document.body.innerHTML = `
  <p>Cats: <span id="counter">0</span></p>
  <button id="increment"> <p><img src="${exampleIconUrl}" class="icon" /></p>
  </button>
`;

//Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
});

//Update Counter Display
function updateDisplay() {
  counterElement.textContent = Math.floor(counter).toString();
}

//Animation using requestAnimationFrame
let lastTime: number | null = null;

function animate(currentTime: number) {
  if (lastTime !== null) {
    const deltaTime = (currentTime - lastTime) / 1000;
    counter += deltaTime;
    updateDisplay();
  }
  lastTime = currentTime;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
