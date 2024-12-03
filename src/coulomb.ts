type Circle = DrawableInterface & {
  radius: number;
  type: DrawableType.Circle;
};

type Tbd = DrawableInterface & {
  type: DrawableType.Tbd;
};

interface DrawableInterface {
  x: number;
  y: number;
  type: DrawableType;
}

enum DrawableType {
  Circle,
  Tbd,
}

type Drawable = Circle | Tbd;

const update = (objs: Drawable[]) => {};

const draw = (ctx: CanvasRenderingContext2D, objs: Drawable[]) => {
  objs.forEach((o) => {
    renderObj(ctx, o);
  });
};

const renderObj = (ctx: CanvasRenderingContext2D, obj: Drawable) => {
  switch (obj.type) {
    case DrawableType.Circle: {
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  }
};

const simLoop = (ctx: CanvasRenderingContext2D, objs: Drawable[]) => {
  update(objs);
  draw(ctx, objs);
  requestAnimationFrame(() => simLoop(ctx, objs));
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

  const objs = [
    { x: 200, y: 100, radius: 20, type: DrawableType.Circle },
    { x: 300, y: 200, radius: 20, type: DrawableType.Circle },
  ];

  simLoop(ctx, objs);
};

run(document);
