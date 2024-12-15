import { FieldVec2, Vec2 } from "./vec2.js";
import { Drawable, DrawableType, Circle } from "./entities.js";
import { applyForce, applyVelocity } from "./common_phys.js";
import { draw } from "./common_draw.js";
import { getContext } from "./common_html.js";
import { calcForce } from "./electric_field.js";
import { canvas_height, canvas_width } from "./constants.js";

const drawables: Drawable[] = [];

let lastTime = 0;
const update = (drawables: Drawable[], time: number) => {
  let deltaTime = time - lastTime;
  lastTime = time;

  // TODO object identifier / tag / different types
  // to avoid index and drawable type based access
  const sourceObj = drawables[0];
  const movingObjs = drawables.slice(1);

  for (let movingObj of movingObjs) {
    if (movingObj.type == DrawableType.Circle) {
      const force = calcForce(sourceObj.obj, movingObj.obj.pos);
      movingObj.obj.force = force;

      applyForce(movingObj.obj, deltaTime);
      applyVelocity(movingObj.obj, deltaTime, 2000);
    }
  }
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
      force: new Vec2(0, 0),
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
      force: new Vec2(0, 0),
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
      force: new Vec2(0, 0),
    },
    color: "red",
  };

  drawables.push(obj);
  drawables.push(movingObj);

  let forceDrawables = generateForceDrawables(
    new Vec2(canvas_width, canvas_height),
    50,
    (gridPoint) => {
      return calcForce(obj.obj, gridPoint);
    }
  );

  drawables.push(...forceDrawables);

  simLoop(ctx, performance.now(), drawables);
};

const addAddParticleButton = (document: Document) => {
  const button = document.createElement("button");
  button.textContent = "Add random particle";
  button.addEventListener("click", () => {
    const randomX = Math.random() * canvas_width;
    const randomY = Math.random() * canvas_height;

    let movingObj: Circle = {
      radius: 10,
      type: DrawableType.Circle,
      obj: {
        charge: 1e-6,
        mass: 1,
        vel: new Vec2(0, 0),
        pos: new Vec2(randomX, randomY),
        force: new Vec2(0, 0),
      },
      color: "red",
    };
    drawables.push(movingObj);
  });
  document.body.appendChild(button);
};

addAddParticleButton(document);
run(document);
