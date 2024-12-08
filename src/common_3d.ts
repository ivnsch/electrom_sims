import { canvas_height, canvas_width } from "./constants.js";
import { Vec2 } from "./vec2.js";
import { Vec3 } from "./vec3.js";

export const toScreenCoords = (modelCoords: Vec3): Vec2 => {
  const aspectRatio = canvas_width / canvas_height;

  const xProj = modelCoords.x / -modelCoords.z;
  const yProj = (modelCoords.y / modelCoords.z) * aspectRatio;

  const xProjRemap = (1 + xProj) / 2;
  const yProjRemap = (1 + yProj) / 2;

  const xProjPix = xProjRemap * canvas_width;
  const yProjPix = yProjRemap * canvas_height;

  return new Vec2(xProjPix, yProjPix);
};
