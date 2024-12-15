import { Vec2 } from "./vec2.js";
import { Drawable, DrawableType, Circle } from "./entities.js";
import { draw } from "./common_draw.js";
import { getContext } from "./common_html.js";

// user defined eq params
const initVelX = 2; // m/s
const initVelY = 5; // m/s

let startTime = 0;
const update = (drawables: Drawable[], time: number) => {
  const timeSinceStart = (time - startTime) / 1000; // s

  const obj = drawables[0];

  obj.obj.pos.x += deltaDisplacement(initVelX, 0, timeSinceStart);
  // multiply by -1: for eq y up is positive, for canvas y down is positive
  obj.obj.pos.y += -deltaDisplacement(
    initVelY,
    -9.8, // gravity m/s^2
    timeSinceStart
  );
};

// kinematic equation of motion
// calculates displacement as function of time
const deltaDisplacement = (v0: number, a: number, t: number): number => {
  const term1 = v0 * t;
  const term2 = 0.5 * a * Math.pow(t, 2);
  return term1 + term2;
};

const simLoop = (
  ctx: CanvasRenderingContext2D,
  time: number,
  drawables: Drawable[]
) => {
  update(drawables, time);
  draw(ctx, time, drawables);
  requestAnimationFrame((time) => simLoop(ctx, time, drawables));
};

const run = (document: Document): void => {
  const ctx = getContext(document);

  let drawable: Circle = {
    radius: 10,
    type: DrawableType.Circle,
    obj: {
      charge: 1e-6,
      mass: 1,
      vel: new Vec2(0, 0),
      pos: new Vec2(300, 200),
      force: new Vec2(0, 0),
    },
    color: "black",
  };

  startTime = performance.now();
  simLoop(ctx, startTime, [drawable]);
};

run(document);
