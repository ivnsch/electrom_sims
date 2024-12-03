const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): void => {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
};

const run = (document: Document): void => {
  const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  drawCircle(ctx, 200, 100);
  drawCircle(ctx, 300, 200);
};

run(document);
