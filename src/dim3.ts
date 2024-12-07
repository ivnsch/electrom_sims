import { toScreenCoords } from "./common_3d.js";
import { drawLine } from "./common_draw.js";
import { getContext } from "./common_html.js";
import { drawCircle } from "./draw.js";
import { Vec3 } from "./vec3.js";

const renderTriangles = (ctx: CanvasRenderingContext2D): void => {
  const side = 1;
  const z_offset = -3;
  const triangles = [
    // front
    [
      { x: -side / 2, y: -side / 2, z: z_offset },
      { x: -side / 2, y: side / 2, z: z_offset },
      { x: side / 2, y: -side / 2, z: z_offset },
    ],
    [
      { x: -side / 2, y: side / 2, z: z_offset },
      { x: side / 2, y: side / 2, z: z_offset },
      { x: side / 2, y: -side / 2, z: z_offset },
    ],
    // back
    [
      { x: -side / 2, y: -side / 2, z: -side + z_offset },
      { x: -side / 2, y: side / 2, z: -side + z_offset },
      { x: side / 2, y: -side / 2, z: -side + z_offset },
    ],
    [
      { x: -side / 2, y: side / 2, z: -side + z_offset },
      { x: side / 2, y: side / 2, z: -side + z_offset },
      { x: side / 2, y: -side / 2, z: -side + z_offset },
    ],
    // top
    [
      { x: -side / 2, y: side / 2, z: -side + z_offset },
      { x: -side / 2, y: side / 2, z: z_offset },
      { x: side / 2, y: side / 2, z: z_offset },
    ],
    [
      { x: -side / 2, y: side / 2, z: -side + z_offset },
      { x: side / 2, y: side / 2, z: -side + z_offset },
      { x: side / 2, y: side / 2, z: z_offset },
    ],
    // right
    [
      { x: side / 2, y: side / 2, z: z_offset },
      { x: side / 2, y: side / 2, z: -side + z_offset },
      { x: side / 2, y: -side / 2, z: z_offset },
    ],
    [
      { x: side / 2, y: -side / 2, z: -side + z_offset },
      { x: side / 2, y: side / 2, z: -side + z_offset },
      { x: side / 2, y: -side / 2, z: z_offset },
    ],
    // bottom
    [
      { x: -side / 2, y: -side / 2, z: -side + z_offset },
      { x: -side / 2, y: -side / 2, z: z_offset },
      { x: side / 2, y: -side / 2, z: z_offset },
    ],
    [
      { x: -side / 2, y: -side / 2, z: -side + z_offset },
      { x: side / 2, y: -side / 2, z: -side + z_offset },
      { x: side / 2, y: -side / 2, z: z_offset },
    ],
    // left
    [
      { x: -side / 2, y: side / 2, z: z_offset },
      { x: -side / 2, y: side / 2, z: -side + z_offset },
      { x: -side / 2, y: -side / 2, z: z_offset },
    ],
    [
      { x: -side / 2, y: -side / 2, z: -side + z_offset },
      { x: -side / 2, y: side / 2, z: -side + z_offset },
      { x: -side / 2, y: -side / 2, z: z_offset },
    ],
  ];

  triangles.forEach((triangle) => {
    let screenCoords1 = toScreenCoords(Vec3.fromShape(triangle[0]));
    let screenCoords2 = toScreenCoords(Vec3.fromShape(triangle[1]));
    let screenCoords3 = toScreenCoords(Vec3.fromShape(triangle[2]));
    drawLine(ctx, screenCoords1, screenCoords2);
    drawLine(ctx, screenCoords2, screenCoords3);
    drawLine(ctx, screenCoords3, screenCoords1);
  });
};

const renderCorners = (ctx: CanvasRenderingContext2D): void => {
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
    let screenCoords = toScreenCoords(Vec3.fromShape(corner));
    drawCircle(ctx, screenCoords.x, screenCoords.y, 5);
  }

  const screenCorners = corners.map((corner) => {
    return toScreenCoords(Vec3.fromShape(corner));
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

const render = (document: Document): void => {
  const ctx = getContext(document);
  //   renderCorners(ctx);
  renderTriangles(ctx);
};

render(document);
