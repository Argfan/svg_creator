<script>


// type keyArr = Array<keyof RRect>
// const dPoint: Ref<keyArr>= ref(['x1'])
// const dType =ref('h')

// const sc_h1_move = (b: boolean, type: string, d: keyArr)=>{
//   if(b){
//     if(!sc_isMove.value) {
      
//       dType.value = type
      
//       dPoint.value = d
//       dPoint.value.forEach(el=>{
//          dif_X.value = elementX.value - (+rect[el]);
//          dif_Y.value = elementY.value - (+rect[el]);
//       })
       
//       if(dType.value=='h') cursor.value = cursorArr.e
//       if(dType.value=='v') cursor.value = cursorArr.n
//       if(dType.value=='hv') cursor.value = cursorArr.ne
//       if(dType.value=='vh') cursor.value = cursorArr.nw
//       sc_isMove.value = true
//       resume()
//     }
//   } else MoveReset()
// }

// const MoveReset =()=>{
//   sc_isMove.value = false
//   cursor.value = cursorArr.a
//   pause()
// }

// const wer = ()=>{
//   if(sc_isMove.value){
    
//     // dPoint.value.forEach((el: keyof RRect)=>{
//       if(rect.width>=40 && rect.height>=40){

//         if(dType.value=='h') rect[dPoint.value[0]] = elementX.value - dif_X.value
//         if(dType.value=='v') rect[dPoint.value[0]] = elementY.value - dif_Y.value
//         if(dType.value=='hv') {
//           rect[dPoint.value[0]] = elementX.value - dif_X.value
//           rect[dPoint.value[1]] = elementY.value - dif_Y.value
//         } 
//       }
//       else {
//         if(dPoint.value[0]=='x1') rect.x1 = rect.x2 - 40
//         if(dPoint.value[0]=='x2') rect.x2 = rect.x1 + 40
//         if(dPoint.value[0]=='y1') rect.y1 = rect.y2 - 40
//         if(dPoint.value[0]=='y2') rect.y2 = rect.y1 + 40
        
//         MoveReset()
//       } 
    // })

    // if(dPoint.value[0] == 'x1'){
    //   if(elementX.value<=rect.x2-30) 
    //   rect.x1 = elementX.value - dif_X.value      
    // }
    // if(dPoint.value[0] == 'x2'){
    //   if(elementX.value>=rect.x1+30) 
    //   rect.x2 = elementX.value - dif_X.value      
    // }
    // if(dPoint.value[0] == 'y1'){
    //   if(elementY.value<=rect.y2-30) 
    //   rect.y1 = elementY.value - dif_Y.value      
    // }
    // if(dPoint.value[0] == 'y2'){
    //   if(elementY.value>=rect.y1+30) 
    //   rect.y2 = elementY.value - dif_Y.value      
    // }
//   }
// }

// const sc_H1 = computed(()=>{
//   return { x: rect.x1, y: rect.y1, w: 10, h: rect.height, c_type: cursorArr.e}
// })
// const sc_H2 = computed(()=>{
//   return { x: rect.x2-10, y: rect.y1, w: 10, h: rect.height, c_type: cursorArr.e}
// })
// const sc_V1 = computed(()=>{
//   return { x: rect.x1, y: rect.y1, w: rect.width, h: 10, c_type: cursorArr.n}
// })
// const sc_V2 = computed(()=>{
//   return { x: rect.x1, y: rect.y2-10, w: rect.width, h: 10, c_type: cursorArr.n}
// })
// const sc_H1V1 = computed(()=>{
//   return { x: rect.x1-10, y: rect.y1-10, w: 30, h: 30, c_type: cursorArr.nw}
// })
// const sc_H2V1 = computed(()=>{
//   return { x: rect.x2-20, y: rect.y1-10, w: 30, h: 30, c_type: cursorArr.ne}
// })
// const sc_H1V2 = computed(()=>{
//   return { x: rect.x1-10, y: rect.y2-20, w: 30, h: 30, c_type: cursorArr.ne}
// })
// const sc_H2V2 = computed(()=>{
//   return { x: rect.x2-20, y: rect.y2-20, w: 30, h: 30, c_type: cursorArr.nw}
// })


</script>

<template>
<!-- <svg xmlns="http://www.w3.org/2000/svg">
      <pattern id="pattern" width="99" height="70" patternUnits="userSpaceOnUse">
          <path d="m0 67h96V35H0V32h47V0h3v32h49V0H0"></path>
      </pattern>
      <filter id="filter">
          <feDropShadow dx="0" dy="0" result="s"></feDropShadow>
          <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="9"></feTurbulence>
          <feComposite in="s" operator="arithmetic" k2=".7" k3=".35"></feComposite>
          <feDiffuseLighting lighting-color="#f84" surfaceScale="9">
              <feDistantLight azimuth="225" elevation="9"></feDistantLight>
          </feDiffuseLighting>
      </filter>
      <rect width="100%" height="100%" fill="url(#pattern)" filter="url(#filter)"></rect>
  </svg> -->

   <!-- <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H1"    @sc_h1_move="b=>sc_h1_move(b, 'h', ['x1'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H2"    @sc_h1_move="b=>sc_h1_move(b, 'h', ['x2'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_V1"    @sc_h1_move="b=>sc_h1_move(b, 'v', ['y1'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_V2"    @sc_h1_move="b=>sc_h1_move(b, 'v', ['y2'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H1V1"  @sc_h1_move="b=>sc_h1_move(b, 'hv', ['x1', 'y1'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H2V1"  @sc_h1_move="b=>sc_h1_move(b, 'vh', ['x2', 'y1'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H1V2"  @sc_h1_move="b=>sc_h1_move(b, 'hv', ['x1', 'y2'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H2V2"  @sc_h1_move="b=>sc_h1_move(b, 'vh', ['x2', 'y2'])" /> -->
</template>