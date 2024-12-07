export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rad: number = 20,
  color: string = "black"
): void => {
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};
