<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core';
import { reactive, ref, computed } from 'vue';
import SvgRect from './SvgRect.vue'
import RRect from '../models/RRect';
import SvgSizeCorrect from './SvgSizeCorrect.vue'

const target = ref(null)

const { x, y, elementX, elementY, isOutside } = useMouseInElement(target)

// const rect = reactive(new RRect())
const rect = reactive(new RRect())

const isDraw = ref(false)

const mouseDown = () => {
  if(!rect.isDone){
    rect.x = Math.round(elementX.value)
    rect.y = Math.round(elementY.value)
    isDraw.value = true
  }
}
const mouseUp = () => {
  isDraw.value = false
  if(isVisible.value) rect.isDone = true 
  
}

const rr = computed(() => {
  if (isDraw.value) {
    rect.x1 = Math.round(Math.min(rect.x, elementX.value))
    rect.x2 = Math.round(Math.max(rect.x, elementX.value))
    rect.y1 = Math.round(Math.min(rect.y, elementY.value))
    rect.y2 = Math.round(Math.max(rect.y, elementY.value))
    rect.width = Math.abs(rect.x1 - rect.x2)
    rect.height = Math.abs(rect.y1 - rect.y2)
  }
  return rect
})

const isVisible = computed(() => {
  if (!isDraw.value) {
    return rect.width > 30 && rect.height > 30
  } else return true
})

const rectClear = ()=>{
  Object.assign(rect, new RRect())
}

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

  <div class="svg_container flex relative">
    <div class="info p-3">
      <div>posXY: {{ x }}, {{ y }}</div>
      <div>posXY el: {{ elementX }}, {{ elementY }}</div>
      <div>isOutside: {{ isOutside }}</div>
      <div>rect:
        <pre>{{ rr }}</pre>
      </div>
    </div>
    <svg class="draw_container" ref="target" viewBox="0 0 650 500" @mousedown="mouseDown" @mouseup="mouseUp">
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

      <SvgRect v-if="isVisible" :rect="rect" />
      <SvgSizeCorrect :rect="rect" />
      
    </svg>
    <div class="d_control absolute left-full t-0 px-3">
      <div class="dc_item" @click="rectClear">
        <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
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
    </div>

  </div>
</template>

<style lang="scss">
  svg {
    // background-repeat: repeat;
  }



</style>