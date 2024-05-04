export default class SizeHelp {
  x1: number = 0
  y1: number = 0
  x2: number = 0
  y2: number = 0
  width: number = 0
  height: number = 0
  ofset: number = 5
  type: 'horizontal' | 'vertical' = 'horizontal'

  public constructor(init?: Partial<SizeHelp>) {
    Object.assign(this, init);
  }
}