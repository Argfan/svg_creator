export default class RRect {
  x1: number = 0
  y1: number = 0
  x2: number = 0
  y2: number = 0
  public constructor(init?: Partial<RRect>) {
    Object.assign(this, init);
  }
}