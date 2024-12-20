import { Vec2 } from "./vec2.js";
import { getContext } from "./common_html.js";
import { canvas_height, canvas_width } from "./constants.js";

const pixelColors: string[][] = [];

const stepSize = 2;
const radius = 70;

const positions: Vec2[] = [];

const colorForDensity = (density: number): string => {
  //   const r = Math.floor(255 * density);
  //   const g = 0;
  //   const b = Math.floor(255 * (1 - density));
  //   return `rgb(${r}, ${g}, ${b}, 1)`;

  return `rgb(${0}, ${0}, ${255}, ${density})`;
};

const smoothingKernel = (radius: number, distance: number) => {
  const volume = (Math.PI * Math.pow(radius, 8)) / 4;
  const value = Math.max(0, radius * radius - distance * distance);
  return Math.pow(value, 3) / volume;
};

const calcDensity = (samplePoint: Vec2, positions: Vec2[]): number => {
  const mass = 1000;

  let totalDensity = 0;

  positions.forEach((position) => {
    const distance = position.distance(samplePoint);
    const influece = smoothingKernel(radius, distance);
    totalDensity += mass * influece;
  });

  return totalDensity;
};

const fillPixelColors = () => {
  for (let x = 0; x < canvas_width; x += stepSize) {
    var arr = [];
    for (let y = 0; y < canvas_height; y += stepSize) {
      const samplePoint = new Vec2(x, y);
      const density = calcDensity(samplePoint, positions);
      const color = colorForDensity(density);
      arr.push(color);
    }
    pixelColors.push(arr);
  }
};

const addRandomPositions = () => {
  for (let index = 0; index < 300; index++) {
    positions.push(
      new Vec2(Math.random() * canvas_width, Math.random() * canvas_height)
    );
  }
};

const run = (document: Document): void => {
  const ctx = getContext(document);

  addRandomPositions();
  fillPixelColors();

  pixelColors.forEach((row, x) => {
    row.forEach((value, y) => {
      ctx.fillStyle = value;
      ctx.fillRect(x * stepSize, y * stepSize, stepSize, stepSize);
    });
  });

  positions.forEach((pos) => {
    ctx.fillStyle = "red";
    ctx.fillRect(pos.x, pos.y, 5, 5);
  });
};

run(document);
