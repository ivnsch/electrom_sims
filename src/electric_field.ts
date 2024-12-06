import { FieldVec2, Vec2 } from "./vec2.js";
import {
  Obj,
  Drawable,
  DrawableType,
  Circle,
  TextDrawable,
  Line,
  Arrow,
} from "./entities.js";
import { draw } from "./common_draw.js";
import { getContext } from "./common_html.js";

const update = (drawables: Drawable[], time: number) => {};

// https://en.wikipedia.org/wiki/Coulomb%27s_law#Mathematical_form
export const calcForce = (obj: Obj, point: Vec2): Vec2 => {
  // Coulomb constant https://en.wikipedia.org/wiki/Coulomb%27s_law#Coulomb_constant
  const k = 8.987e9;

  const dPos = point.sub(obj.pos);
  const distanceSquared = Math.pow(dPos.x, 2) + Math.pow(dPos.y, 2);

  if (distanceSquared < 1e-12) return new Vec2(0, 0);

  const distance = Math.sqrt(distanceSquared);
  const r = dPos.div(distance);

  const forceMagnitude = (k * obj.charge) / distanceSquared;

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

const generateForceField = (
  area: Vec2,
  step: number,
  pointForceCalculator: (gridPoint: Vec2) => Vec2
): FieldVec2[] => {
  let forces: FieldVec2[] = [];

  const maxMag = 3.59; // hardcoded current max. magnitude
  const lineLenMax = 30; // rendered max length

  let maxMagnitude = 0;
  for (let x = 0; x < area.x / step; x++) {
    for (let y = 0; y < area.y / step; y++) {
      const gridPoint = new Vec2(x * step, y * step);

      const force = pointForceCalculator(gridPoint);
      const magnitude = force.magnitude();
      if (magnitude) {
        const factor = lineLenMax / maxMag;
        const vec = force
          .normalize()
          .mul(magnitude * factor)
          .add(gridPoint);

        forces.push(new FieldVec2(gridPoint, vec));

        maxMagnitude = Math.max(magnitude, maxMagnitude);
      }
    }
  }

  console.log("maxMagnitude: %o", maxMagnitude);
  return forces;
};

const generateForceDrawables = (
  area: Vec2,
  step: number,
  pointForceCalculator: (gridPoint: Vec2) => Vec2
): Drawable[] => {
  const forces: FieldVec2[] = generateForceField(
    area,
    step,
    pointForceCalculator
  );

  return forces.map((force) => {
    return forceToDrawable(force);
  });
};

const forceToDrawable = (force: FieldVec2): Drawable => {
  return {
    obj: {
      charge: 1,
      mass: 1,
      vel: new Vec2(0, 0),
      pos: force.start,
    },
    type: DrawableType.Arrow,
    start: force.start,
    end: force.end,
  };
};

const run = (document: Document): void => {
  const ctx = getContext(document);

  let obj: Circle = {
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

  const drawables: Drawable[] = [obj];

  let forceDrawables = generateForceDrawables(
    new Vec2(1000, 600), // assigned in html
    50,
    (gridPoint) => {
      return calcForce(obj.obj, gridPoint);
    }
  );

  drawables.push(...forceDrawables);

  simLoop(ctx, performance.now(), drawables);
};

run(document);
