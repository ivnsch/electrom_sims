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
