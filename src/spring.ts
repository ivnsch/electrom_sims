import { drawLine } from "./common_draw.js";
import { getContext } from "./common_html.js";
import { Vec2 } from "./vec2.js";

let springWidth = 300;
let contract = false;
let expand = false;
const renderSpring = (ctx: CanvasRenderingContext2D): void => {
  if (contract) {
    springWidth = Math.max(0, springWidth - 1);
  } else if (expand) {
    springWidth = springWidth + 1;
  }

  const width = 1000;
  const height = 600;
  const center = new Vec2(width, height).div(2);

  const springHeight = 50;
  const springParts = 20;
  const springWaveLength = springWidth / springParts;

  const start = new Vec2(
    center.x - springWidth / 2,
    center.y + springHeight / 2
  );

  for (let i = 0; i < springParts; i++) {
    const waveStartX = start.x + i * springWaveLength;
    const point1 = new Vec2(waveStartX, start.y);
    const point2 = new Vec2(
      waveStartX + springWaveLength / 2,
      start.y - springHeight
    );
    const point3 = new Vec2(waveStartX + springWaveLength, start.y);
    drawLine(ctx, point1, point2);
    drawLine(ctx, point2, point3);
  }
};

const render = (document: Document): void => {
  const ctx = getContext(document);
  ctx.clearRect(0, 0, 1000, 600);

  renderSpring(ctx);
  requestAnimationFrame(() => render(document));
};

const addContractButton = (document: Document) => {
  const button = document.createElement("button");
  button.textContent = "Contract";
  button.addEventListener("mousedown", () => {
    contract = true;
  });
  button.addEventListener("mouseup", () => {
    contract = false;
  });
  document.body.appendChild(button);
  const button2 = document.createElement("button");
  button2.textContent = "Expand";
  button2.addEventListener("mousedown", () => {
    expand = true;
  });
  button2.addEventListener("mouseup", () => {
    expand = false;
  });
  document.body.appendChild(button2);
};

addContractButton(document);
render(document);
