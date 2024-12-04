import { Vec2 } from "./vec2.js";
import { Obj, Drawable, DrawableType } from "./entities.js";
import { applyForce } from "./common_phys.js";
import { draw } from "./common_draw.js";
import { getContext } from "./common_html.js";

let lastTime = 0;
const update = (drawables: Drawable[], time: number) => {
  let deltaTime = time - lastTime;

  // for now we'll just assume these 2 objs
  let d1 = drawables[0];
  let d2 = drawables[1];

  let force1 = calcForce(d1.obj, d2.obj);
  let force2 = calcForce(d2.obj, d1.obj);

  applyForce(d1.obj, force1, deltaTime);
  applyForce(d2.obj, force2, deltaTime);

  drawables.forEach((d) => {
    // this needs to be implemented better
    const slowingFactor = 20000;
    d.obj.pos.x += (d.obj.vel.x * deltaTime) / slowingFactor;
    d.obj.pos.y += (d.obj.vel.y * deltaTime) / slowingFactor;
  });
};

// https://en.wikipedia.org/wiki/Coulomb%27s_law#Mathematical_form
export const calcForce = (obj1: Obj, obj2: Obj): Vec2 => {
  // Coulomb constant https://en.wikipedia.org/wiki/Coulomb%27s_law#Coulomb_constant
  const k = 8.987e9;

  const dPos = obj1.pos.sub(obj2.pos);
  const distance = Math.sqrt(Math.pow(dPos.x, 2) + Math.pow(dPos.y, 2));

  if (distance < 1e-6) return new Vec2(0, 0);

  const r = dPos.div(distance);

  const forceMagnitude = (k * obj1.charge * obj2.charge) / distance;

  return r.mul(forceMagnitude);
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

  const drawables = [
    {
      x: 300,
      y: 200,
      radius: 20,
      type: DrawableType.Circle,
      obj: {
        charge: -1e-6,
        mass: 1,
        vel: new Vec2(0, 0),
        pos: new Vec2(300, 200),
      },
      color: "red",
    },
    {
      x: 200,
      y: 100,
      radius: 20,
      type: DrawableType.Circle,
      obj: {
        charge: 1e-6,
        mass: 1,
        vel: new Vec2(0, 0),
        pos: new Vec2(200, 100),
      },
      color: "green",
    },
  ];

  simLoop(ctx, performance.now(), drawables);
};

run(document);
