import { Vec2 } from "./vec2.js";
import { Vec3 } from "./vec3.js";

export const toScreenCoords = (modelCoords: Vec3): Vec2 => {
  // defined in html
  const width = 1000;
  const height = 600;

  const aspectRatio = width / height;

  // project onto canvas
  // note z negated so usual axes orientation up/right positive
  const xProj = modelCoords.x / -modelCoords.z;
  const yProj = (modelCoords.y / modelCoords.z) * aspectRatio;
  // normalize ([-1, 1] -> [0, 1])
  const xProjRemap = (1 + xProj) / 2;
  const yProjRemap = (1 + yProj) / 2;
  // normalized -> full canvas space
  const xProjPix = xProjRemap * width;
  const yProjPix = yProjRemap * height;

  return new Vec2(xProjPix, yProjPix);
};
