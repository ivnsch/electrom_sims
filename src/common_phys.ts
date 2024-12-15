import { Obj } from "./entities.js";
import { Vec2 } from "./vec2.js";

export const applyForce = (obj: Obj, deltaTime: number) => {
  // f = ma
  const a = obj.force.div(obj.mass);

  // v = at (change in velocity in time passed)
  const vel = a.mul(deltaTime);

  // add the velocity
  obj.vel = obj.vel.add(vel);
};

export const applyVelocity = (
  obj: Obj,
  deltaTime: number,
  slowingFactor: number = 1
) => {
  obj.pos.x += (obj.vel.x * deltaTime) / slowingFactor;
  obj.pos.y += (obj.vel.y * deltaTime) / slowingFactor;
};
