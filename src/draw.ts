export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): void => {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
};
