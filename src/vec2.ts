export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  sub(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  mul(scalar: number): Vec2 {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  div(scalar: number): Vec2 {
    if (scalar === 0) throw new Error("Division by zero");
    return new Vec2(this.x / scalar, this.y / scalar);
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vec2 {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    return this.div(mag);
  }

  toString(): string {
    return `Vec2(${this.x}, ${this.y})`;
  }
}

// a Vec2 in a field, that is with an explicit starting point
export class FieldVec2 {
  // these are strictly speaking points, not vecs, but for now conveniently as vecs
  start: Vec2;
  end: Vec2;

  constructor(start: Vec2, vec: Vec2) {
    this.start = start;
    this.end = vec;
  }
}
