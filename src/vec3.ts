export class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static fromShape = (shape: Vec3Shape) => {
    return new Vec3(shape.x, shape.y, shape.z);
  };

  add(other: Vec3): Vec3 {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  sub(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  mul(scalar: number): Vec3 {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  div(scalar: number): Vec3 {
    if (scalar === 0) throw new Error("Division by zero");
    return new Vec3(this.x / scalar, this.y / scalar, this.y / scalar);
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  normalize(): Vec3 {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    return this.div(mag);
  }

  toString(): string {
    return `Vec3(${this.x}, ${this.y}, ${this.z})`;
  }
}

// a Vec3 in a field, that is with an explicit starting point
export class FieldVec3 {
  // these are strictly speaking points, not vecs, but for now conveniently as vecs
  start: Vec3;
  end: Vec3;

  constructor(start: Vec3, vec: Vec3) {
    this.start = start;
    this.end = vec;
  }
}

type Vec3Shape = { x: number; y: number; z: number };
