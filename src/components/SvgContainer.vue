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

const { x, y, elementX, elementY, isOutside, elementWidth, elementHeight } = useMouseInElement(target)

const me = useMEStore()
// const { x, y, elementX, elementY, isOutside, elementWidth, elementHeight } = toRefs(me)
// const {sourceType, x, y, elementX, elementY, isOutside, elementPositionX, elementPositionY, elementWidth, elementHeight } = useMouseInElement(target)


const viewBox = reactive(new ViewBox())

const rectList:Ref<RRect[]> = ref([])
const rectTemp = reactive(new RRect)

const isDrawRect = ref(false)

const isDraw = ref(false)

const cursor = ref(cursorArr.a)

const isHand = ref(false)
const isViewBoxMove = ref(false)

const dX = ref(0)
const dY = ref(0)

const mouseDown = () => {  
  if(isDrawRect.value){
    isDraw.value = true    
  }  
  if(isHand.value) {
    isViewBoxMove.value = true
    dX.value = elementX.value + viewBox.x * sArr[sIndex.value]/100
    dY.value = elementY.value + viewBox.y * sArr[sIndex.value]/100
    resume()
  }
}

const mouseUp = () => {
  isDraw.value = false
  isViewBoxMove.value = false
  pause()
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
  clearCursor()
  isDrawRect.value = true
  cursor.value = cursorArr.c  
}
const handClick = ()=>{
  clearCursor()
  isHand.value = true
  cursor.value = cursorArr.g  
}
const clearCursor = ()=>{  
  isDrawRect.value = false
  isHand.value = false
  cursor.value = cursorArr.a
}

const {sArrSet} = useScalingContainer()
const {viewBoxSet} = useViewBox()

const sArr = ScalingArray
const sIndex = ref(4)

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
  viewBox.ws = Math.round(elementWidth.value) 
  viewBox.hs = Math.round(elementHeight.value) 
  viewBox.w=viewBox.ws
  viewBox.h=viewBox.hs
  viewBoxSet(viewBox)
})

const { pause, resume } = watchPausable(
  [elementX, elementY], () => wer(),
)
pause()
const wer = ()=>{  
  viewBox.x = -(elementX.value-dX.value) * 100/sArr[sIndex.value]
  viewBox.y = -(elementY.value-dY.value) * 100/sArr[sIndex.value]
  viewBoxSet(viewBox)
}



onMounted(()=>{
  me.MEInint(target.value)
})


useEventListener(window, 'mousewheel', (evt: WheelEvent) => {
  if(!isOutside.value) {
    if (evt.deltaY<0 && sIndex.value<sArr.length-1) sIndex.value+=1
    if (evt.deltaY>0 && sIndex.value>0) sIndex.value-=1
    
    viewBoxScaling()
  }
})

</script>

<template>
  

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
    </svg>
    <div class="absolute bottom-full right-0">{{ sArr[sIndex] }}%</div>
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
      <div class="dc_item" @click="handClick" :class="{'active': isHand}">
        <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/></svg>
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