<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import RRect from '../models/RRect';
import SvgSizeHelp from './SvgSizeHelp.vue';
import SizeHelp from '../models/SizeHelp';
import {dCreator} from '../service/helper';

import SvgSizeCorrect from './SvgSizeCorrect.vue'
import cursorArr from '../moks/cursorArr';
import { watchAtMost, watchPausable } from '@vueuse/core';
import { counter } from '@fortawesome/fontawesome-svg-core';

interface propType {
  rect: RRect,
  cursor: string,
  elementX: number,
  elementY: number,
  drawStrat: boolean
}

const prop = defineProps<propType>()

const emit = defineEmits<{
  (e: 'update:rect', rect:RRect): void,
  (e: 'update:cursor', cursor:string): void,
}>()
const {rect, elementX, elementY, cursor, drawStrat} = toRefs(prop)

const dif_X  = ref(0)
const dif_Y  = ref(0)

const Sizeh = computed(() => {
  return {
    x1: rect.value.x1,
    x2: rect.value.x2,
    y1: rect.value.y1,
    y2: rect.value.y2,
    width: rect.value.width,
    height: rect.value.height,
  } as SizeHelp
})



const { stop, pause, resume } = watchPausable(
  [elementX, elementY], () => wer(),
)
pause()
watchAtMost(
  drawStrat, 
  (b)=>{    
    if(b) {
      rect.value.x = elementX.value
      rect.value.y = elementY.value
      resume()
    } else pause()
  },
  {count: 2}
  
)

const d = computed(()=>{
  return  rect.value.width>20 && rect.value.height>20 ? dCreator(rect.value) + dCreator(rect.value, 10) : dCreator(rect.value)
})
const wer = ()=>{
  console.log('asd');
  
  if(drawStrat.value && !rect.value.isDone) {
    rect.value.x1 = Math.round(Math.min(rect.value.x, elementX.value))
    rect.value.x2 = Math.round(Math.max(rect.value.x, elementX.value))
    rect.value.y1 = Math.round(Math.min(rect.value.y, elementY.value))
    rect.value.y2 = Math.round(Math.max(rect.value.y, elementY.value))

    rect.value.width = Math.abs(rect.value.x1 - rect.value.x2)
    rect.value.height = Math.abs(rect.value.y1 - rect.value.y2)
  }



  // rect.value.x1 += 1
  // emit('update:rect', rect.value)
  // emit('update:cursor', cursorArr.e)
}
const sc_h1_move = (b, t, a)=>{
  if(b) {
    emit('update:cursor', cursorArr.e)
    resume()
  } 
  else {
    emit('update:cursor', cursorArr.a)
    pause()
  } 
}

const sc_H1 = computed(()=>{
  return { x: rect.value.x1, y: rect.value.y1, w: 10, h: rect.value.height, c_type: cursorArr.e}
})

</script>

<template>
  <g>
    <SvgSizeHelp :size="Sizeh" />  
    <path
      @click="wer"
      :d="d"
      fill="url(#wall-pattern)"
    />
    <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H1" @sc_h1_move="b=>sc_h1_move(b, 'h', ['x1'])" />
  </g> 

</template>

<style lang="scss" scoped>
// g {
//   stroke: rgba($color: #1979ff, $alpha: 1);
//   stroke-width: 1;
// }

.dash {
  stroke-dasharray: 3, 3;
}

text {
  text-anchor: middle;
  stroke: none;
  fill: rgba($color: #ffffff, $alpha: 1);
}


.rrect {
  // fill: rgba($color: #fff, $alpha: 0.1);
  stroke: rgba($color: #fff, $alpha: 0.5);
  // stroke-width: 1;
  paint-order: stroke;
}
</style>