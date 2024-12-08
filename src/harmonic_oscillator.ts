import { getContext } from "./common_html.js";
import { renderSpring } from "./common_spring.js";
import { canvas_height, canvas_width } from "./constants.js";
import { drawCircle, drawOutlineCircle } from "./draw.js";
import { Vec2 } from "./vec2.js";

const renderHarmonicOscillator = (
  ctx: CanvasRenderingContext2D,
  time: number
): void => {
  const center = new Vec2(canvas_width, canvas_height).div(2);

  const amplitude = 200;
  const period = 8000; // ms

  const omega = (2 * Math.PI) / period;
  const omegaTime = omega * time;
  const x = amplitude * Math.cos(omegaTime);

  const springHeight = 50;

  const start = new Vec2(center.x - x / 2, center.y + springHeight / 2);

  renderSpring(ctx, start, x, springHeight);
  renderProgressCircle(ctx, omegaTime);
};

const renderProgressCircle = (
  ctx: CanvasRenderingContext2D,
  omegaTime: number
) => {
  const center = new Vec2(canvas_width, canvas_height).div(2);
  const circleCenter = new Vec2(center.x, center.y - 150);

  const radius = 50;
  drawOutlineCircle(ctx, circleCenter.x, circleCenter.y, radius);

  const x = Math.cos(omegaTime) * radius + circleCenter.x;
  const y = Math.sin(omegaTime) * radius + circleCenter.y;

  drawCircle(ctx, x, y, 5);
};

const render = (document: Document, time: number): void => {
  const ctx = getContext(document);
  ctx.clearRect(0, 0, 1000, 600);

  renderHarmonicOscillator(ctx, time);
  requestAnimationFrame((time) => render(document, time));
};

render(document, performance.now());
