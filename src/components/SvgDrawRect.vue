<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import RRect from '../models/RRect';
import SvgSizeHelp from './SvgSizeHelp.vue';
import SizeHelp from '../models/SizeHelp';
import {dCreator} from '../service/helper';


import { watchAtMost, watchPausable } from '@vueuse/core';
import { useMEStore } from '../store/useMEStore';

const me = useMEStore()
const { elementX, elementY } = toRefs(me)

interface propType {
  rect: RRect,
  drawStrat: boolean
}

const prop = defineProps<propType>()

const emit = defineEmits<{
  // (e: 'update:rect', rect:RRect): void,
  (e: 'update:cursor', cursor:string): void,
  // (e: 'updateRect', rect: RRect): void,
}>()
const {rect, drawStrat} = toRefs(prop)

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

  // emit('updateRect', rect.value)


  // rect.value.x1 += 1
  // emit('update:rect', rect.value)
  // emit('update:cursor', cursorArr.e)
}


</script>

<template>
  <g>
    <SvgSizeHelp :size="Sizeh" />  
    <path
      :d="d"
      fill="url(#wall-pattern)"
    />    
  </g> 

</template>

<style lang="scss" scoped>

</style>