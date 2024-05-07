
export default (rect: any, w=0)=>{
  return `
    M ${rect.x1+w} ${rect.y1+w}
    L ${rect.x2-w} ${rect.y1+w}
    L ${rect.x2-w} ${rect.y2-w}
    L ${rect.x1+w} ${rect.y2-w}
    L ${rect.x1+w} ${rect.y1+w}
    Z
  `
}