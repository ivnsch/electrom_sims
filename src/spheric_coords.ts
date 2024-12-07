import { toScreenCoords } from "./common_3d.js";
import { getContext } from "./common_html.js";
import { drawCircle } from "./draw.js";
import { Vec3 } from "./vec3.js";

// iterate through spheric coords to make a sphere
const renderSphere = (ctx: CanvasRenderingContext2D): void => {
  let r = 1;

  // divide by a very large value (e.g. 1000) to see a solid sphere
  let step = (Math.PI * 2) / 50;
  for (let t = 0; t < Math.PI * 2; t += step) {
    for (let p = 0; p < Math.PI * 2; p += step) {
      const cartesian = toCartesian({ r: r, theta: t, phi: p });
      cartesian.z -= 3;

      const screenCoords = toScreenCoords(cartesian);
      drawCircle(ctx, screenCoords.x, screenCoords.y, 5);
    }
  }
};

const renderThetaSlice = (ctx: CanvasRenderingContext2D): void => {
  let r = 1;

  let step = (Math.PI * 2) / 50;
  for (let t = step * 3; t < step * 4; t += step) {
    for (let p = 0; p < Math.PI * 2; p += step) {
      const cartesian = toCartesian({ r: r, theta: t, phi: p });
      cartesian.z -= 3;

      const screenCoords = toScreenCoords(cartesian);
      drawCircle(ctx, screenCoords.x, screenCoords.y, 5);
    }
  }
};

const renderPhiSlice = (ctx: CanvasRenderingContext2D): void => {
  let r = 1;

  let step = (Math.PI * 2) / 50;
  for (let t = 0; t < Math.PI * 2; t += step) {
    for (let p = step * 3; p < step * 4; p += step) {
      const cartesian = toCartesian({ r: r, theta: t, phi: p });
      cartesian.z -= 3;

      const screenCoords = toScreenCoords(cartesian);
      drawCircle(ctx, screenCoords.x, screenCoords.y, 5);
    }
  }
};

type SphericCoords = {
  r: number;
  theta: number;
  phi: number;
};

const toCartesian = (spheric: SphericCoords): Vec3 => {
  return new Vec3(
    spheric.r * Math.sin(spheric.theta) * Math.cos(spheric.phi),
    spheric.r * Math.sin(spheric.theta) * Math.sin(spheric.phi),
    spheric.r * Math.cos(spheric.theta)
  );
};

const render = (document: Document): void => {
  const ctx = getContext(document);
  renderSphere(ctx);
  //   renderThetaSlice(ctx);
  //   renderPhiSlice(ctx);
};

render(document);
