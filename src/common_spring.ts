import { drawLine } from "./common_draw.js";
import { Vec2 } from "./vec2.js";

export const renderSpring = (
  ctx: CanvasRenderingContext2D,
  start: Vec2,
  springWidth: number,
  springHeight: number
) => {
  const springParts = 20;
  const springWaveLength = springWidth / springParts;

  for (let i = 0; i < springParts; i++) {
    const waveStartX = start.x + i * springWaveLength;
    const point1 = new Vec2(waveStartX, start.y);
    const point2 = new Vec2(
      waveStartX + springWaveLength / 2,
      start.y - springHeight
    );
    const point3 = new Vec2(waveStartX + springWaveLength, start.y);
    drawLine(ctx, point1, point2);
    drawLine(ctx, point2, point3);
  }
};
