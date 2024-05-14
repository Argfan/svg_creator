export default class RRect {
  id: number = Date.now()
  x: number = 0
  y: number = 0
  x1: number = 0
  y1: number = 0
  x2: number = 0
  y2: number = 0
  width: number = 0
  height: number = 0
  rx: number = 3
  w: number = 10
  isDone: boolean = false

  moveX:string= 'x1'
  moveY:string= 'y1'

  public constructor(init?: Partial<RRect>) {
    Object.assign(this, init);
  }
}