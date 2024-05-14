<script setup lang="ts">
import { useEventListener, useMouseInElement, useScroll, useWindowScroll, watchOnce, watchPausable } from '@vueuse/core';
import { reactive, ref, computed, watch, Ref, onMounted, toRef, toRefs, onUnmounted } from 'vue';
import SvgRect from './SvgRect.vue'
import RRect from '../models/RRect';
import SvgSizeCorrect from './SvgSizeCorrect.vue'
import cursorArr from '../moks/cursorArr';
import SvgDrawRect from './SvgDrawRect.vue';
import { useMEStore } from '../store/useMEStore';
import ScalingArray from '../moks/ScalingArray';
import { useScalingContainer } from '../store/useScalingContainer';
import { useViewBox } from '../store/useViewBox';
import ViewBox from '../models/ViewBox';

const target = ref(null)

// const { x, y, elementX, elementY, isOutside } = useMouseInElement(target)

const me = useMEStore()
const { x, y, elementX, elementY, isOutside, elementWidth, elementHeight } = toRefs(me)
// const {sourceType, x, y, elementX, elementY, isOutside, elementPositionX, elementPositionY, elementWidth, elementHeight } = useMouseInElement(target)


const viewBox = reactive(new ViewBox())

const rectList:Ref<RRect[]> = ref([])
const rectTemp = reactive(new RRect)

const isDrawRect = ref(false)

const isDraw = ref(false)

const cursor = ref(cursorArr.a)

const mouseDown = () => {  
  if(isDrawRect.value){
    isDraw.value = true    
  }  
}

const mouseUp = () => {
  isDraw.value = false
  if(isDrawRect.value) {
    isDrawRect.value = false
    if(rectTemp.width>40 && rectTemp.height>40) {
      rectTemp.isDone = true
      rectList.value.push({...rectTemp})
    } 
    cursor.value = cursorArr.a
    Object.assign(rectTemp, new RRect)
  }
  // if(isVisible.value) rect.isDone = true 
  
}

// const rr = computed(() => {
//   if (isDraw.value) {
//     rect.x1 = Math.round(Math.min(rect.x, elementX.value))
//     rect.x2 = Math.round(Math.max(rect.x, elementX.value))
//     rect.y1 = Math.round(Math.min(rect.y, elementY.value))
//     rect.y2 = Math.round(Math.max(rect.y, elementY.value))    
//   }
//   rect.width = Math.abs(rect.x1 - rect.x2)
//   rect.height = Math.abs(rect.y1 - rect.y2)
//   return rect
// })

const isVisible = computed(() => {
  // if (!isDraw.value) {
  //   return rect.width > 30 && rect.height > 30
  // } else return true

  return true
})

const rectClear = ()=>{
  // Object.assign(rect, new RRect())
  rectList.value.pop()
}
const updateRect = (i: number, r:RRect)=>{
  rectList.value[i]=r
}
const addRect = ()=>{
  isDrawRect.value = true
  cursor.value = cursorArr.c  
}

const {sArrSet} = useScalingContainer()
const {viewBoxSet} = useViewBox()



const sArr = ScalingArray
const sIndex = ref(4)

// const vbs:Ref<number> = ref(sArr[sIndex.value])

const vbScaling = (n: number)=>{
  sIndex.value = n
  viewBoxScaling()
}

const viewBoxScaling = ()=>{  
  const w = viewBox.ws * 100/sArr[sIndex.value]
  const h = viewBox.hs * 100/sArr[sIndex.value]

  viewBox.x = viewBox.xs - (w - viewBox.ws)/2
  viewBox.y = viewBox.ys - (h - viewBox.hs)/2
  viewBox.w = w
  viewBox.h = h

  viewBoxSet(viewBox)
  sArrSet(sIndex.value)
}

watchOnce(elementWidth, ()=>{
  console.log(elementWidth.value);
  console.log(elementHeight.value);
  viewBox.ws = Math.round(elementWidth.value) 
  viewBox.hs = Math.round(elementHeight.value) 
  viewBox.w=viewBox.ws
  viewBox.h=viewBox.hs
  viewBoxSet(viewBox)
})

onMounted(()=>{
  me.MEInint(target.value)
  console.log(target.value);
  
  console.log(elementWidth.value);
  console.log('scroll');
  // console.log(elementHeight.value); 
  
  // viewBox.w = elementWidth.value
  // viewBox.h = elementHeight.value

  // window.addEventListener('click', ()=>{
  //   console.log('scroll');  
  // })
})

onUnmounted(()=>{
  // window.removeEventListener('click', ()=>{
  //   'remove'
  // })
})



useEventListener(window, 'mousewheel', (evt: WheelEvent) => {
  if(!isOutside.value) {
    if (evt.deltaY<0 && sIndex.value<sArr.length-1) sIndex.value+=1
    if (evt.deltaY>0 && sIndex.value>0) sIndex.value-=1
    
    viewBoxScaling()
  }
})




// const { pause, resume } = watchPausable(
//   [elementX, elementY], () => wer(),
// )
// pause()

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

  <div class="svg_container flex relative"
    
  >
    <div class="info p-3">      
      <div>posXY: {{ x }}, {{ y }}</div>
      <div>posXY el: {{ elementX }}, {{ elementY }}</div>
      <div>isOutside: {{ isOutside }}</div>
      <div>size: {{ elementWidth }}, {{ elementHeight }}</div>
      <div>viewBox:
        <pre>{{ viewBox }}</pre>
      </div>
      <div>rectTemp:
        <pre>{{ rectTemp }}</pre>
      </div>

    </div>
    <svg class="draw_container" ref="target" 
      :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`" 
      @mousedown="mouseDown" 
      @mouseup="mouseUp"
      :style="{'cursor': cursor}"
    >
      <pattern
        id="wall-pattern"
        width="10"
        height="10"
        viewBox="0 0 30 30"
        patternUnits="userSpaceOnUse"
      >
        <rect width="30" height="30" class="wallPC1"/>
        <path class="wallPC2" d="M 0 0 L 7.071 0 L 30 22.92 L 30 30 L 22.92 30 L 0 7.071 L 0 0"/>
        <path class="wallPC2" d="M 0 22.92 L 7.071 30 L 0 30 L 0 22.92"/>
        <path class="wallPC2" d="M 22.92 0 L 30 0 L 30 7.071 L 22.92 0"/>
      </pattern>       
        
      <SvgRect
        v-for="(rect, i) in rectList" :key="rect.id"
        v-if="isVisible" 
        :rect="rect" 
        v-model:cursor="cursor"
        @updateRect="updateRect(i, $event)"
      />

      <SvgDrawRect 
        v-if="isDrawRect"
        v-model:rect="rectTemp" 
        
        :drawStrat="isDraw"
      />
      
      <!-- <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H1"    @sc_h1_move="b=>sc_h1_move(b, 'h', ['x1'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H2"    @sc_h1_move="b=>sc_h1_move(b, 'h', ['x2'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_V1"    @sc_h1_move="b=>sc_h1_move(b, 'v', ['y1'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_V2"    @sc_h1_move="b=>sc_h1_move(b, 'v', ['y2'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H1V1"  @sc_h1_move="b=>sc_h1_move(b, 'hv', ['x1', 'y1'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H2V1"  @sc_h1_move="b=>sc_h1_move(b, 'vh', ['x2', 'y1'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H1V2"  @sc_h1_move="b=>sc_h1_move(b, 'hv', ['x1', 'y2'])" />
      <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H2V2"  @sc_h1_move="b=>sc_h1_move(b, 'vh', ['x2', 'y2'])" /> -->
      
    </svg>
    <div class="d_control absolute left-full t-0 px-3">
      <div class="dc_item" @click="rectClear">
        <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
      </div>
      <div class="dc_item" @click="addRect" :class="{'active': isDrawRect}">
        <svg viewBox="0 0 30 30" width="20" height="20">
          <path d="M 0 0 h 30 v 30 h -30 v -30 Z M 8 8 h 14 v 14 h -14 v -14 Z" fill="url(#wall-pattern)"/>
        </svg>
      </div>
      <div class="dc_item">
        <svg viewBox="0 0 30 30" width="20" height="20">
          <path d="M 10 0 h 10 v 30 h -10 v -10 Z" fill="url(#wall-pattern)"/>
        </svg>
      </div>
      <div class="dc_item">
        <svg viewBox="0 0 30 30" width="20" height="20">
          <path d="M 0 10 v 10 h 30 v -10 h -10 Z" fill="url(#wall-pattern)"/>
        </svg>
      </div>
      <div class="dc_item" @click="vbScaling(2)">
        50%
      </div>
      <div class="dc_item" @click="vbScaling(4)">
        100%
      </div>
      <div class="dc_item" @click="vbScaling(5)">
        150%
      </div>    
      <div class="dc_item" @click="vbScaling(6)">
        200%
      </div>    
      <div class="dc_item" @click="vbScaling(7)">
        400%
      </div>    
    </div>

  </div>
</template>

<style lang="scss">
  svg {
    // background-repeat: repeat;
  }



</style>