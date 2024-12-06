import { getContext } from "./common_html.js";
import { drawCircle } from "./draw.js";

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

  // defined in html
  const width = 1000;
  const height = 600;

  const aspectRatio = width / height;

  for (const corner of corners) {
    // project onto canvas
    const xProj = corner.x / corner.z;
    const yProj = (corner.y / corner.z) * aspectRatio;
    // normalize ([-1, 1] -> [0, 1])
    const xProjRemap = (1 + xProj) / 2;
    const yProjRemap = (1 + yProj) / 2;
    // normalized -> full canvas space
    const xProjPix = xProjRemap * width;
    const yProjPix = yProjRemap * height;

    drawCircle(ctx, xProjPix, yProjPix, 5);
  }
};

render(document);
