import { Drawable, DrawableType, Line } from "./entities.js";
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
      drawCircle(ctx, screenCords, drawable.radius, drawable.color);
      break;
    }
    case DrawableType.Text: {
      ctx.fillStyle = "black";
      ctx.fillText(drawable.text, screenCords.x, screenCords.y);
      break;
    }
    case DrawableType.Line: {
      const screenCordsStart = toScreenCoords(drawable.start);
      const screenCordsEnd = toScreenCoords(drawable.end);
      drawLine(ctx, screenCordsStart, screenCordsEnd);
      break;
    }
    case DrawableType.Arrow: {
      const screenCordsStart = toScreenCoords(drawable.start);
      const screenCordsEnd = toScreenCoords(drawable.end);
      drawLine(ctx, screenCordsStart, screenCordsEnd);
      drawCircle(ctx, screenCordsEnd, 2, "black");
      break;
    }
  }
};

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  center: Vec2,
  radius: number,
  color: string
) => {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

const drawLine = (ctx: CanvasRenderingContext2D, start: Vec2, end: Vec2) => {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};
