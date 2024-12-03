import { drawCircle } from "./draw.js";

const run = (document: Document): void => {
  const canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D context not available");
  }

  drawCircle(ctx, 200, 100);
  drawCircle(ctx, 300, 200);
};

run(document);
