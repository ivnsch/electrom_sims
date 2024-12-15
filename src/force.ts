import { Vec2 } from "./vec2.js";
import { Obj, Drawable, DrawableType, Circle } from "./entities.js";
import { applyForce, applyVelocity } from "./common_phys.js";
import { draw } from "./common_draw.js";
import { getContext } from "./common_html.js";

const drawable: Circle = {
  radius: 20,
  type: DrawableType.Circle,
  obj: {
    charge: -1e-6,
    mass: 1,
    vel: new Vec2(0, 0),
    pos: new Vec2(300, 200),
    force: new Vec2(0, 0),
  },
  color: "black",
};

let lastTime = 0;
const update = (drawables: Drawable[], time: number) => {
  let deltaTime = time - lastTime;
  lastTime = time;

  let d = drawables[0];

  applyForce(d.obj, deltaTime);

  //   console.log("velocity: %o", d.obj.vel);

  // now that velocity was updated, update position accordingly
  applyVelocity(d.obj, deltaTime);
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

  const drawables: Circle[] = [drawable];

  simLoop(ctx, performance.now(), drawables);
};

const addApplyForceButton = (document: Document) => {
  const button = document.createElement("button");
  button.textContent = "Apply force";
  button.addEventListener("click", () => {
    drawable.obj.force = new Vec2(0.0002, 0.0001);
    // stop applying force after a second - velocity constant after
    setTimeout(function () {
      console.log("stopped applying force");
      drawable.obj.force = new Vec2(0, 0);
    }, 1000);
  });
  document.body.appendChild(button);
};

addApplyForceButton(document);
run(document);
