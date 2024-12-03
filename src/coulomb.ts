type Circle = DrawableInterface & {
  radius: number;
  type: DrawableType.Circle;
};

// physics object
// guess this can be more specific..
type Obj = {
  pos: Vec2;
  mass: number;
  vel: Vec2;
  charge: number;
};

type Tbd = DrawableInterface & {
  type: DrawableType.Tbd;
};

interface DrawableInterface {
  type: DrawableType;
  // for now all drawables have a corresponding physics object
  obj: Obj;
}

enum DrawableType {
  Circle,
  Tbd,
}

type Drawable = Circle | Tbd;

const applyForce = (obj: Obj, f: Vec2) => {
  const ax = f.x / obj.mass;
  const ay = f.y / obj.mass;
  obj.vel.x += ax;
  obj.vel.y += ay;
};

let lastTime = 0;
const update = (drawables: Drawable[], time: number) => {
  let deltaTime = time - lastTime;

  // for now we'll just assume these 2 objs
  let d1 = drawables[0];
  let d2 = drawables[1];

  let force = calcForce(d1.obj, d2.obj);

  applyForce(d1.obj, force);
  applyForce(d2.obj, { x: -force.x, y: -force.y });

  drawables.forEach((d) => {
    // this needs to be implemented better
    const slowingFactor = 10;
    d.obj.pos.x += (d.obj.vel.x * deltaTime) / slowingFactor;
    d.obj.pos.y += (d.obj.vel.y * deltaTime) / slowingFactor;
  });
};

const draw = (
  ctx: CanvasRenderingContext2D,
  time: number,
  objs: Drawable[]
) => {
  ctx.clearRect(0, 0, 1000, 600);

  objs.forEach((o) => {
    renderObj(ctx, time, o);
  });
};

const toScreenCoords = (objPos: Vec2): Vec2 => {
  // for now screen and real world coords are the same
  return { x: objPos.x, y: objPos.y };
};

const renderObj = (
  ctx: CanvasRenderingContext2D,
  time: number,
  drawable: Drawable
) => {
  const screenCords = toScreenCoords(drawable.obj.pos);
  switch (drawable.type) {
    case DrawableType.Circle: {
      ctx.beginPath();
      ctx.arc(screenCords.x, screenCords.y, drawable.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  }
};

type Vec2 = {
  x: number;
  y: number;
};

// https://en.wikipedia.org/wiki/Coulomb%27s_law#Mathematical_form
const calcForce = (obj1: Obj, obj2: Obj): Vec2 => {
  // Coulomb constant https://en.wikipedia.org/wiki/Coulomb%27s_law#Coulomb_constant
  const k = 8.987e9;

  const dx = obj2.pos.x - obj1.pos.x;
  const dy = obj2.pos.y - obj1.pos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const rx = dx / distance;
  const ry = dy / distance;

  if (distance < 1e-6) return { x: 0, y: 0 };

  const forceMagnitude = (k * Math.abs(obj1.charge * obj2.charge)) / distance;

  return {
    x: forceMagnitude * rx,
    y: forceMagnitude * ry,
  };
};

const simLoop = (
  ctx: CanvasRenderingContext2D,
  time: number,
  drawables: Drawable[]
) => {
  console.log("time: " + time);

  update(drawables, time);
  draw(ctx, time, drawables);
  requestAnimationFrame((time) => simLoop(ctx, time, drawables));
};

const run = (document: Document): void => {
  const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D context not available");
  }

  const drawables = [
    {
      x: 200,
      y: 100,
      radius: 20,
      type: DrawableType.Circle,
      obj: {
        charge: 1e-6,
        mass: 1,
        vel: { x: 0, y: 0 },
        pos: { x: 200, y: 100 },
      },
    },
    {
      x: 300,
      y: 200,
      radius: 20,
      type: DrawableType.Circle,
      obj: {
        charge: -1e-6,
        mass: 1,
        vel: { x: 0, y: 0 },
        pos: { x: 300, y: 200 },
      },
    },
  ];

  simLoop(ctx, performance.now(), drawables);
};

run(document);
