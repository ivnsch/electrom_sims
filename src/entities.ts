import { Vec2 } from "./vec2.js";

export type Circle = DrawableInterface & {
  radius: number;
  type: DrawableType.Circle;
  color: string;
};

// physics object
// guess this can be more specific..
export type Obj = {
  pos: Vec2;
  mass: number;
  vel: Vec2;
  charge: number;
};

export type Tbd = DrawableInterface & {
  type: DrawableType.Tbd;
};

export interface DrawableInterface {
  type: DrawableType;
  // for now all drawables have a corresponding physics object
  obj: Obj;
}

export enum DrawableType {
  Circle,
  Tbd,
}

export type Drawable = Circle | Tbd;