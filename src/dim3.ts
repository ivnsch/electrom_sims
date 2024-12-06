import { getContext } from "./common_html.js";
import { drawCircle } from "./draw.js";

type Point3d = { x: number; y: number; z: number };
type Point2d = { x: number; y: number };

const toScreenCoords = (modelCoords: Point3d): Point2d => {
  // defined in html
  const width = 1000;
  const height = 600;

  const aspectRatio = width / height;

  // project onto canvas
  const xProj = modelCoords.x / modelCoords.z;
  const yProj = (modelCoords.y / modelCoords.z) * aspectRatio;
  // normalize ([-1, 1] -> [0, 1])
  const xProjRemap = (1 + xProj) / 2;
  const yProjRemap = (1 + yProj) / 2;
  // normalized -> full canvas space
  const xProjPix = xProjRemap * width;
  const yProjPix = yProjRemap * height;

  return { x: xProjPix, y: yProjPix };
};

const render = (document: Document): void => {
  const ctx = getContext(document);

  const corners = [
    { x: 1, y: -1, z: -5 },
    { x: 1, y: -1, z: -3 },
    { x: 1, y: 1, z: -5 },
    { x: 1, y: 1, z: -3 },
    { x: -1, y: -1, z: -5 },
    { x: -1, y: -1, z: -3 },
    { x: -1, y: 1, z: -5 },
    { x: -1, y: 1, z: -3 },
  ];

  for (const corner of corners) {
    let screenCoords = toScreenCoords(corner);

    drawCircle(ctx, screenCoords.x, screenCoords.y, 5);
  }
};

render(document);
