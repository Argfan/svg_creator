<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core';
import { reactive, ref } from 'vue';
import SvgRect from './SvgRect.vue'
import RRect from '../models/RRect';

const target = ref(null)

const { x, y, elementX, elementY, isOutside } = useMouseInElement(target)

const rect = reactive(new RRect())

const isDraw = ref(false)

const mouseDown = ()=>{
  isDraw.value=true
  rect.x1 = elementX.value
  rect.y1 = elementY.value
}
const mouseUp = ()=>{
  isDraw.value = true
  rect.x2 = elementX.value
  rect.y2 = elementY.value
}

</script>

<template>
  <div class="svg_container flex" >
    <div class="info w-1/3 p-3">
      <div>pos: {{ x }}, {{ y }}</div>
      <div>pos: {{ elementX }}, {{ elementY }}</div>
      <div>isOutside: {{ isOutside }}</div>
      <div>rect: <pre>{{ rect }}</pre></div>
    </div>
    <svg class="draw_container grow h-full" ref="target" @mousedown="mouseDown" @mouseup="mouseUp">
      <!-- <SvgRect :x="rect.x1" :y="rect.y1" :rwidth="rect.x2-rect.x1" :rheight="rect.y2-rect.y1"/> -->
      <SvgRect :rect="rect"/>
    </svg>
  </div>
</template>

<style lang="scss">

  .svg_container{
    border: 1px solid #5a5a5a;
    width: 800px;
    height: 350px;
    user-select: none;
    .info{
      border-right: 1px solid #5a5a5a;
    }
  }

</style>