import { FieldVec2, Vec2 } from "./vec2.js";
import { Drawable, DrawableType, Circle } from "./entities.js";
import { applyForce, applyVelocity } from "./common_phys.js";
import { draw } from "./common_draw.js";
import { getContext } from "./common_html.js";
import { calcForce } from "./electric_field.js";

let lastTime = 0;
const update = (drawables: Drawable[], time: number) => {
  let deltaTime = time - lastTime;
  lastTime = time;

  const sourceObj = drawables[0];
  const movingObj = drawables[1];

  const force = calcForce(sourceObj.obj, movingObj.obj.pos);

  applyForce(movingObj.obj, force, deltaTime);
  applyVelocity(movingObj.obj, deltaTime);
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

  let movingObj: Circle = {
    radius: 10,
    type: DrawableType.Circle,
    obj: {
      charge: 1e-6,
      mass: 1,
      vel: new Vec2(0, 0),
      pos: new Vec2(400, 300),
    },
    color: "red",
  };

  const drawables: Drawable[] = [obj, movingObj];

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
