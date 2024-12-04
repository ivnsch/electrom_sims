import { Vec2 } from "./vec2.js";
import {
  Obj,
  Drawable,
  DrawableType,
  Circle,
  TextDrawable,
} from "./entities.js";
import { applyForce } from "./common_phys.js";
import { draw } from "./common_draw.js";
import { getContext } from "./common_html.js";

const update = (drawables: Drawable[], time: number) => {
  // for now we'll just assume this obj
  let d = drawables[0];
};

// https://en.wikipedia.org/wiki/Coulomb%27s_law#Mathematical_form
export const calcForce = (obj: Obj, point: Vec2): Vec2 => {
  // Coulomb constant https://en.wikipedia.org/wiki/Coulomb%27s_law#Coulomb_constant
  const k = 8.987e9;

  const dPos = obj.pos.sub(point);
  const distance = Math.sqrt(Math.pow(dPos.x, 2) + Math.pow(dPos.y, 2));

  if (distance < 1e-6) return new Vec2(0, 0);

  const r = dPos.div(distance);

  const forceMagnitude = (k * obj.charge) / distance;

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

  let obj: Circle = {
    radius: 20,
    type: DrawableType.Circle,
    obj: {
      charge: -1e-6,
      mass: 1,
      vel: new Vec2(0, 0),
      pos: new Vec2(300, 200),
    },
    color: "red",
  };

  let forces: Drawable[] = [];

  let step = 50;
  let width = 1000;
  let height = 600;
  for (let x = 0; x < width / step; x++) {
    for (let y = 0; y < height / step; y++) {
      const point = new Vec2(x * step, y * step);
      const f = calcForce(obj.obj, point);

      const item: TextDrawable = {
        obj: {
          charge: 0,
          mass: 0,
          vel: new Vec2(0, 0),
          pos: point,
        },
        type: DrawableType.Text,
        text: "" + f.magnitude().toFixed(1),
      };
      forces.push(item);
    }
  }

  const drawables: Drawable[] = [obj];

  drawables.push(...forces);

  simLoop(ctx, performance.now(), drawables);
};

run(document);
