import { Vec3 } from "./vec3.js";

export class Matrix3x3 {
  private values: number[];

  constructor(values: number[]) {
    if (values.length !== 9) {
      throw new Error("Matrix must have 9 elements.");
    }
    this.values = values;
  }

  mul(v: Vec3): Vec3 {
    const a = this.values;
    const x = v.x,
      y = v.y,
      z = v.z;

    return new Vec3(
      a[0] * x + a[1] * y + a[2] * z,
      a[3] * x + a[4] * y + a[5] * z,
      a[6] * x + a[7] * y + a[8] * z
    );
  }

  static rotY(angle: number): Matrix3x3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix3x3([cos, 0, sin, 0, 1, 0, -sin, 0, cos]);
  }
}
