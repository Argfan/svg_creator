<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core';
import { reactive, ref, computed } from 'vue';
import SvgRect from './SvgRect.vue'
import RRect from '../models/RRect';

const target = ref(null)

const { x, y, elementX, elementY, isOutside } = useMouseInElement(target)

// const rect = reactive(new RRect())
const rect = reactive({
  x: 0, y: 0, x1: 0, y1: 0, x2: 0, y2: 0
})

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
  }
  return rect

})

</script>

<template>
  <div class="svg_container flex">
    <div class="info w-60 p-3">
      <div>posXY: {{ x }}, {{ y }}</div>
      <div>posXY el: {{ elementX }}, {{ elementY }}</div>
      <div>isOutside: {{ isOutside }}</div>
      <div>rect:
        <pre>{{ rr }}</pre>
      </div>
    </div>
    <svg class="draw_container grow h-full" ref="target" @mousedown="mouseDown" @mouseup="mouseUp">
      <SvgRect :x1="rect.x1" :y1="rect.y1" :x2="rect.x2" :y2="rect.y2" />
      <!-- <SvgRect :rect="rect"/> -->
    </svg>
  </div>
</template>

<style lang="scss">
.svg_container {
  border: 1px solid #5a5a5a;
  width: 800px;
  height: 350px;
  user-select: none;

  .info {
    border-right: 1px solid #5a5a5a;
  }
}
</style>