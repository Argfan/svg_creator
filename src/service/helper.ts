
export const dCreator = (rect: any, w=0)=>{
  return `
    M ${rect.x1+w} ${rect.y1+w}
    L ${rect.x2-w} ${rect.y1+w}
    L ${rect.x2-w} ${rect.y2-w}
    L ${rect.x1+w} ${rect.y2-w}
    L ${rect.x1+w} ${rect.y1+w}
    Z
  `
}
export const creat_rect = (x: number, y: number, w: number, h:number)=>{
  return `M ${x} ${y} h ${w} v ${h} h ${-w} v ${-h} z`
}