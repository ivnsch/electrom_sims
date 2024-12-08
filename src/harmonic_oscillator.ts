import { getContext } from "./common_html.js";
import { renderSpring } from "./common_spring.js";
import { Vec2 } from "./vec2.js";

const renderHarmonicOscillator = (
  ctx: CanvasRenderingContext2D,
  time: number
): void => {
  const width = 1000;
  const height = 600;
  const center = new Vec2(width, height).div(2);

  const amplitude = 200;
  const period = 8000; // ms

  const omega = (2 * Math.PI) / period;
  const x = amplitude * Math.cos(omega * time);

  const springHeight = 50;

  const start = new Vec2(center.x - x / 2, center.y + springHeight / 2);

  renderSpring(ctx, start, x, springHeight);
};

const render = (document: Document, time: number): void => {
  const ctx = getContext(document);
  ctx.clearRect(0, 0, 1000, 600);

  renderHarmonicOscillator(ctx, time);
  requestAnimationFrame((time) => render(document, time));
};

render(document, performance.now());
