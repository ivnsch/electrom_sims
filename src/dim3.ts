import { toScreenCoords } from "./common_3d.js";
import { drawLine } from "./common_draw.js";
import { getContext } from "./common_html.js";
import { drawCircle } from "./draw.js";
import { Matrix3x3 } from "./matrix_3x3.js";
import { Vec2 } from "./vec2.js";
import { Vec3, Vec3Shape } from "./vec3.js";

const renderTriangles = (ctx: CanvasRenderingContext2D): void => {
  const side = 1;
  const zOffset = -3;
  const triangles = [
    // front
    [
      { x: -side / 2, y: -side / 2, z: zOffset },
      { x: -side / 2, y: side / 2, z: zOffset },
      { x: side / 2, y: -side / 2, z: zOffset },
    ],
    [
      { x: -side / 2, y: side / 2, z: zOffset },
      { x: side / 2, y: side / 2, z: zOffset },
      { x: side / 2, y: -side / 2, z: zOffset },
    ],
    // back
    [
      { x: -side / 2, y: -side / 2, z: -side + zOffset },
      { x: -side / 2, y: side / 2, z: -side + zOffset },
      { x: side / 2, y: -side / 2, z: -side + zOffset },
    ],
    [
      { x: -side / 2, y: side / 2, z: -side + zOffset },
      { x: side / 2, y: side / 2, z: -side + zOffset },
      { x: side / 2, y: -side / 2, z: -side + zOffset },
    ],
    // top
    [
      { x: -side / 2, y: side / 2, z: -side + zOffset },
      { x: -side / 2, y: side / 2, z: zOffset },
      { x: side / 2, y: side / 2, z: zOffset },
    ],
    [
      { x: -side / 2, y: side / 2, z: -side + zOffset },
      { x: side / 2, y: side / 2, z: -side + zOffset },
      { x: side / 2, y: side / 2, z: zOffset },
    ],
    // right
    [
      { x: side / 2, y: side / 2, z: zOffset },
      { x: side / 2, y: side / 2, z: -side + zOffset },
      { x: side / 2, y: -side / 2, z: zOffset },
    ],
    [
      { x: side / 2, y: -side / 2, z: -side + zOffset },
      { x: side / 2, y: side / 2, z: -side + zOffset },
      { x: side / 2, y: -side / 2, z: zOffset },
    ],
    // bottom
    [
      { x: -side / 2, y: -side / 2, z: -side + zOffset },
      { x: -side / 2, y: -side / 2, z: zOffset },
      { x: side / 2, y: -side / 2, z: zOffset },
    ],
    [
      { x: -side / 2, y: -side / 2, z: -side + zOffset },
      { x: side / 2, y: -side / 2, z: -side + zOffset },
      { x: side / 2, y: -side / 2, z: zOffset },
    ],
    // left
    [
      { x: -side / 2, y: side / 2, z: zOffset },
      { x: -side / 2, y: side / 2, z: -side + zOffset },
      { x: -side / 2, y: -side / 2, z: zOffset },
    ],
    [
      { x: -side / 2, y: -side / 2, z: -side + zOffset },
      { x: -side / 2, y: side / 2, z: -side + zOffset },
      { x: -side / 2, y: -side / 2, z: zOffset },
    ],
  ];

  triangles.forEach((triangle) => {
    let rotMatrix = Matrix3x3.rotY(Math.PI / 4);
    let screenCoords1 = transform(rotMatrix, triangle[0], zOffset);
    let screenCoords2 = transform(rotMatrix, triangle[1], zOffset);
    let screenCoords3 = transform(rotMatrix, triangle[2], zOffset);
    drawLine(ctx, screenCoords1, screenCoords2);
    drawLine(ctx, screenCoords2, screenCoords3);
    drawLine(ctx, screenCoords3, screenCoords1);
  });
};

const transform = (
  rotMatrix: Matrix3x3,
  vertex: Vec3Shape,
  zOffset: number
): Vec2 => {
  // translate, such that origin is at center of cube
  vertex.z -= zOffset;
  const vec = Vec3.fromShape(vertex);
  // apply rotation
  const rotated = rotMatrix.mul(vec);
  // translate back
  rotated.z += zOffset;
  // map to screen coords
  return toScreenCoords(rotated);
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
