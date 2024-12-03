const drawCircle = (ctx, x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
};

const run = (document) => {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");

  drawCircle(ctx, 200, 100);
  drawCircle(ctx, 300, 200);
};

run(document);
