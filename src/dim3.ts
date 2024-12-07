import { toScreenCoords } from "./common_3d.js";
import { drawLine } from "./common_draw.js";
import { getContext } from "./common_html.js";
import { drawCircle } from "./draw.js";
import { Matrix3x3 } from "./matrix_3x3.js";
import { Vec2 } from "./vec2.js";
import { Vec3, Vec3Shape } from "./vec3.js";

const cubeSide = 1;
const zOffset = -3;

var rotateAroundY = false;
var rotationAroundY = 0;

const renderTriangles = (ctx: CanvasRenderingContext2D): void => {
  if (rotateAroundY) {
    rotationAroundY += Math.PI / 100;
  }

  const triangles = [
    // front
    [
      { x: -cubeSide / 2, y: -cubeSide / 2, z: zOffset },
      { x: -cubeSide / 2, y: cubeSide / 2, z: zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: zOffset },
    ],
    [
      { x: -cubeSide / 2, y: cubeSide / 2, z: zOffset },
      { x: cubeSide / 2, y: cubeSide / 2, z: zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: zOffset },
    ],
    // back
    [
      { x: -cubeSide / 2, y: -cubeSide / 2, z: -cubeSide + zOffset },
      { x: -cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: -cubeSide + zOffset },
    ],
    [
      { x: -cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: -cubeSide + zOffset },
    ],
    // top
    [
      { x: -cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: -cubeSide / 2, y: cubeSide / 2, z: zOffset },
      { x: cubeSide / 2, y: cubeSide / 2, z: zOffset },
    ],
    [
      { x: -cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: cubeSide / 2, z: zOffset },
    ],
    // right
    [
      { x: cubeSide / 2, y: cubeSide / 2, z: zOffset },
      { x: cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: zOffset },
    ],
    [
      { x: cubeSide / 2, y: -cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: zOffset },
    ],
    // bottom
    [
      { x: -cubeSide / 2, y: -cubeSide / 2, z: -cubeSide + zOffset },
      { x: -cubeSide / 2, y: -cubeSide / 2, z: zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: zOffset },
    ],
    [
      { x: -cubeSide / 2, y: -cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: -cubeSide + zOffset },
      { x: cubeSide / 2, y: -cubeSide / 2, z: zOffset },
    ],
    // left
    [
      { x: -cubeSide / 2, y: cubeSide / 2, z: zOffset },
      { x: -cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: -cubeSide / 2, y: -cubeSide / 2, z: zOffset },
    ],
    [
      { x: -cubeSide / 2, y: -cubeSide / 2, z: -cubeSide + zOffset },
      { x: -cubeSide / 2, y: cubeSide / 2, z: -cubeSide + zOffset },
      { x: -cubeSide / 2, y: -cubeSide / 2, z: zOffset },
    ],
  ];

  triangles.forEach((triangle) => {
    console.log("!! rotationAroundY" + rotationAroundY);
    let rotMatrix = Matrix3x3.rotY(rotationAroundY);
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
  const translationForRotationAroundCenter = zOffset - cubeSide / 2;
  // translate, such that origin is at center of cube
  vertex.z -= translationForRotationAroundCenter;
  const vec = Vec3.fromShape(vertex);
  // apply rotation
  const rotated = rotMatrix.mul(vec);
  // translate back
  rotated.z += translationForRotationAroundCenter;
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

const drawXYAxes = (ctx: CanvasRenderingContext2D) => {
  const zOffset = -3;
  const x1 = {
    x: -4,
    y: 0,
    z: zOffset,
  };
  const x2 = {
    x: 4,
    y: 0,
    z: zOffset,
  };
  const y1 = {
    x: 0,
    y: 4,
    z: zOffset,
  };
  const y2 = {
    x: 0,
    y: -4,
    z: zOffset,
  };

  drawLine(
    ctx,
    toScreenCoords(Vec3.fromShape(x1)),
    toScreenCoords(Vec3.fromShape(x2))
  );
  drawLine(
    ctx,
    toScreenCoords(Vec3.fromShape(y1)),
    toScreenCoords(Vec3.fromShape(y2))
  );
};

const render = (document: Document): void => {
  const ctx = getContext(document);
  ctx.clearRect(0, 0, 1000, 600);

  drawXYAxes(ctx);
  //   renderCorners(ctx);
  renderTriangles(ctx);
  requestAnimationFrame(() => render(document));
};

const addRotateButton = (document: Document) => {
  const button = document.createElement("button");
  button.textContent = "Rotate";
  button.addEventListener("mousedown", () => {
    rotateAroundY = true;
    console.log("down");
  });
  button.addEventListener("mouseup", () => {
    rotateAroundY = false;
    console.log("up");
  });
  document.body.appendChild(button);
};

addRotateButton(document);
render(document);
