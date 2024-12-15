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
  // force being exerted on the object
  force: Vec2;
};

// this gets a "Drawable" at the end to diff from other things named "Text"
export type TextDrawable = DrawableInterface & {
  type: DrawableType.Text;
  text: string;
};

export type Line = DrawableInterface & {
  type: DrawableType.Line;
  start: Vec2;
  end: Vec2;
};

export type Arrow = DrawableInterface & {
  type: DrawableType.Arrow;
  start: Vec2;
  end: Vec2;
};

export interface DrawableInterface {
  type: DrawableType;
  // for now all drawables have a corresponding physics object
  obj: Obj;
}

export enum DrawableType {
  Circle,
  Text,
  Line,
  Arrow,
}

export type Drawable = Circle | TextDrawable | Line | Arrow;
