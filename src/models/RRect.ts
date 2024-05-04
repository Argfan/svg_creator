export default class RRect {
  x: number = 0
  y: number = 0
  x1: number = 0
  y1: number = 0
  x2: number = 0
  y2: number = 0
  width: number = 0
  height: number = 0
  rx: number = 3

  public constructor(init?: Partial<RRect>) {
    Object.assign(this, init);
  }
}