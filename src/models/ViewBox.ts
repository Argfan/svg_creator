export default class ViewBox {
  x: number = 0
  y: number = 0
  xs: number = 0
  ys: number = 0
  w: number = 0
  h: number = 0
  ws: number = 0
  hs: number = 0
  public constructor(init?: Partial<ViewBox>) {
    Object.assign(this, init);
  }
}