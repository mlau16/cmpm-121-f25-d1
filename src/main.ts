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
const counterElement = document.getElementById("counter")!

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
})