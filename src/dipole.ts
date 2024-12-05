import { Vec2 } from "./vec2.js";
import {
  Obj,
  Drawable,
  DrawableType,
  Circle,
  TextDrawable,
  Line,
  Arrow,
} from "./entities.js";
import { applyForce } from "./common_phys.js";
import { draw } from "./common_draw.js";
import { getContext } from "./common_html.js";

const update = (drawables: Drawable[], time: number) => {
  // for now we'll just assume this obj
  let d = drawables[0];
};

// Coulomb constant https://en.wikipedia.org/wiki/Coulomb%27s_law#Coulomb_constant
const k = 8.987e9;

const calcForceMagnitude = (obj: Obj, point: Vec2): number => {
  const distance = calcDistance(obj, point);

  if (distance < 1e-6) return 0;

  return (k * obj.charge) / distance;
};

const calcDistance = (obj: Obj, point: Vec2): number => {
  const dPos = point.sub(obj.pos);
  return Math.sqrt(Math.pow(dPos.x, 2) + Math.pow(dPos.y, 2));
};

const calculateDirectionVector = (obj: Obj, point: Vec2): Vec2 => {
  const distance = calcDistance(obj, point);

  if (distance < 1e-6) return new Vec2(0, 0);

  const dPos = point.sub(obj.pos);
  return dPos.div(distance);
};

// https://en.wikipedia.org/wiki/Coulomb%27s_law#Mathematical_form
const calcForce = (obj: Obj, point: Vec2): Vec2 => {
  const distance = calcDistance(obj, point);

  if (distance < 1e-6) return new Vec2(0, 0);

  const r = calculateDirectionVector(obj, point);

  const forceMagnitude = calcForceMagnitude(obj, point);

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

  let objPositive: Circle = {
    radius: 20,
    type: DrawableType.Circle,
    obj: {
      charge: 1e-6,
      mass: 1,
      vel: new Vec2(0, 0),
      pos: new Vec2(300, 200),
    },
    color: "red",
  };
  let objNegative: Circle = {
    radius: 20,
    type: DrawableType.Circle,
    obj: {
      charge: -1e-6,
      mass: 1,
      vel: new Vec2(0, 0),
      pos: new Vec2(500, 200),
    },
    color: "green",
  };

  let forces: Drawable[] = [];

  const step = 50;

  // HACK: why is the field scaled by 2?
  // the formulas and the rendering *appear* to be correct
  // it probably relates to dipole adding 2 similar terms - formula might be incomplete
  const correction = 2;
  // enable this and disable above to see problem
  //   const correction = 1;

  // dimensions assigned in html
  const width = 1000 * correction;
  const height = 600 * correction;

  const maxMag = 180; // hardcoded current max. magnitude
  const lineLenMax = 30; // rendered max length

  for (let x = 0; x < width / step; x++) {
    for (let y = 0; y < height / step; y++) {
      let point = new Vec2(x * step, y * step);

      const vectorToPositive = point.sub(objPositive.obj.pos);
      const vectorToNegative = point.sub(objNegative.obj.pos);

      const termForPositive = calcForce(objPositive.obj, vectorToPositive);
      const termForNegative = calcForce(objNegative.obj, vectorToNegative);

      let forceAdded = termForPositive.add(termForNegative);

      const lineStart = point;

      const factor = lineLenMax / maxMag;
      let magnitude = forceAdded.magnitude();
      if (magnitude) {
        const lineEnd = forceAdded
          .normalize()
          .mul(magnitude * factor)
          .add(lineStart);

        const correctedLineStart = lineStart.div(correction);
        const correctedLineEnd = lineEnd.div(correction);
        const item: Arrow = {
          obj: {
            charge: 1,
            mass: 1,
            vel: new Vec2(0, 0),
            pos: point,
          },
          type: DrawableType.Arrow,
          start: correctedLineStart,
          end: correctedLineEnd,
        };
        forces.push(item);
      }
    }
  }

  const drawables: Drawable[] = [objPositive, objNegative];

  drawables.push(...forces);

  simLoop(ctx, performance.now(), drawables);
};

run(document);
