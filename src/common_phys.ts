import { Obj } from "./entities.js";
import { Vec2 } from "./vec2.js";

export const applyForce = (obj: Obj, f: Vec2, deltaTime: number) => {
  // f = ma
  const a = f.div(obj.mass);

  // a -> v
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
