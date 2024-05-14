<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import RRect from '../models/RRect';

import {dCreator} from '../service/helper';

import SvgSizeCorrect from './SvgSizeCorrect.vue'
import cursorArr from '../moks/cursorArr';

import { useMEStore } from '../store/useMEStore';

const me = useMEStore()
const { elementX, elementY } = toRefs(me)

interface propType {
  rect: RRect,
  cursor: string,
}

const prop = defineProps<propType>()

const emit = defineEmits<{
  // (e: 'update:rect', rect:RRect): void,
  (e: 'update:cursor', cursor:string): void,
  (e: 'updateRect', rect: RRect): void,
}>()
const {rect, cursor} = toRefs(prop)

const dif_X  = ref(0)
const dif_Y  = ref(0)


const d = computed(()=>{
  return  rect.value.width>20 && rect.value.height>20 ? dCreator(rect.value) + dCreator(rect.value, rect.value.w) : dCreator(rect.value)
})
const wer = ()=>{
  

  // emit('updateRect', rect.value)


  // rect.value.x1 += 1
  // emit('update:rect', rect.value)
  // emit('update:cursor', cursorArr.e)
}
const sc_h1_move = (b, t, a)=>{
  if(b) {
    emit('update:cursor', cursorArr.e)
  } 
  else {
    emit('update:cursor', cursorArr.a)
  } 
}

const sc_H1 = computed(()=>{
  return { x: rect.value.x1, y: rect.value.y1, w: 10, h: rect.value.height, c_type: cursorArr.e}
})

</script>

<template>
  <g>
    <path
      @click="wer"
      :d="d"
      fill="url(#wall-pattern)"
    />
    <!-- <SvgSizeCorrect v-if="rect.isDone" :dd="sc_H1" @sc_h1_move="b=>sc_h1_move(b, 'h', ['x1'])" /> -->
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