import { drawLine } from "./common_draw.js";
import { getContext } from "./common_html.js";
import { drawCircle } from "./draw.js";
import { Vec2 } from "./vec2.js";

type Vec3 = { x: number; y: number; z: number };

const toScreenCoords = (modelCoords: Vec3): Vec2 => {
  // defined in html
  const width = 1000;
  const height = 600;

  const aspectRatio = width / height;

  // project onto canvas
  // note z negated so usual axes orientation up/right positive
  const xProj = modelCoords.x / -modelCoords.z;
  const yProj = (modelCoords.y / -modelCoords.z) * aspectRatio;
  // normalize ([-1, 1] -> [0, 1])
  const xProjRemap = (1 + xProj) / 2;
  const yProjRemap = (1 + yProj) / 2;
  // normalized -> full canvas space
  const xProjPix = xProjRemap * width;
  const yProjPix = yProjRemap * height;

  return new Vec2(xProjPix, yProjPix);
};

const render = (document: Document): void => {
  const ctx = getContext(document);

  const corners = [
    { x: 1, y: -1, z: -5 }, // 0
    { x: 1, y: -1, z: -3 }, // 1
    { x: 1, y: 1, z: -5 }, // 2
    { x: 1, y: 1, z: -3 }, // 3
    { x: -1, y: -1, z: -5 }, // 4
    { x: -1, y: -1, z: -3 }, // 5
    { x: -1, y: 1, z: -5 }, // 6
    { x: -1, y: 1, z: -3 }, // 7
  ];

  for (const corner of corners) {
    let screenCoords = toScreenCoords(corner);
    drawCircle(ctx, screenCoords.x, screenCoords.y, 5);
  }

  const screenCorners = corners.map((corner) => {
    return toScreenCoords(corner);
  });

  screenCorners.forEach((screenCorner, index) => {
    ctx.fillStyle = "red";
    drawCircle(ctx, screenCorner.x, screenCorner.y, 5);
    ctx.fillStyle = "black";
    ctx.fillText("" + index, screenCorner.x, screenCorner.y);
  });

  drawLine(ctx, screenCorners[0], screenCorners[1]);
  drawLine(ctx, screenCorners[4], screenCorners[5]);
  drawLine(ctx, screenCorners[2], screenCorners[3]);
  drawLine(ctx, screenCorners[6], screenCorners[7]);
  drawLine(ctx, screenCorners[0], screenCorners[2]);
  drawLine(ctx, screenCorners[2], screenCorners[6]);
  drawLine(ctx, screenCorners[6], screenCorners[4]);
  drawLine(ctx, screenCorners[4], screenCorners[0]);
  drawLine(ctx, screenCorners[3], screenCorners[7]);
  drawLine(ctx, screenCorners[7], screenCorners[5]);
  drawLine(ctx, screenCorners[5], screenCorners[1]);
  drawLine(ctx, screenCorners[1], screenCorners[3]);
};

render(document);
