<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core';
import { reactive, ref, computed } from 'vue';
import SvgRect from './SvgRect.vue'
import RRect from '../models/RRect';

const target = ref(null)

const { x, y, elementX, elementY, isOutside } = useMouseInElement(target)

// const rect = reactive(new RRect())
const rect = reactive(new RRect())

const isDraw = ref(false)

const mouseDown = () => {
  rect.x = Math.round(elementX.value)
  rect.y = Math.round(elementY.value)
  isDraw.value = true
}
const mouseUp = () => {
  isDraw.value = false
}

const rr = computed(() => {
  if (isDraw.value) {
    rect.x1 = Math.round(Math.min(rect.x, elementX.value))
    rect.x2 = Math.round(Math.max(rect.x, elementX.value))
    rect.y1 = Math.round(Math.min(rect.y, elementY.value))
    rect.y2 = Math.round(Math.max(rect.y, elementY.value))
    rect.width = Math.abs(rect.x1-rect.x2)
    rect.height = Math.abs(rect.y1-rect.y2)
  }
  return rect
})

const isVisible = computed(()=>{
  if(!isDraw.value) {
    return rect.width>30 && rect.height>30
  } else  return true
})

</script>

<template>
  <div class="svg_container flex">
    <div class="info p-3">
      <div>posXY: {{ x }}, {{ y }}</div>
      <div>posXY el: {{ elementX }}, {{ elementY }}</div>
      <div>isOutside: {{ isOutside }}</div>
      <div>rect:
        <pre>{{ rr }}</pre>
      </div>
    </div>
    <svg class="draw_container" ref="target" viewBox="0 0 650 500"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
    >
      <SvgRect v-if="isVisible" :rect="rect"/> 
    </svg>
  </div>
</template>

<style lang="scss">
.svg_container {
  border: 1px solid #5a5a5a;
  user-select: none;

  .info {
    border-right: 1px solid #5a5a5a;
    width: 170px;
  }
  .draw_container{
    width: 650px;
    height: 500px;
  }
}
</style>