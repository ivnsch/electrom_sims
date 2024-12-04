import { Drawable, DrawableType } from "./entities.js";
import { Vec2 } from "./vec2.js";

export const draw = (
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
  return objPos;
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
      ctx.fillStyle = drawable.color;
      ctx.fill();
      break;
    }
    case DrawableType.Text: {
      ctx.fillStyle = "black";
      ctx.fillText(drawable.text, screenCords.x, screenCords.y);
      break;
    }
  }
};
