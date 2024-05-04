<script setup lang="ts">
import { computed, toRefs } from 'vue';
import SizeHelp from '../models/SizeHelp';

const prop = defineProps<{ size: SizeHelp }>()
const {size} = toRefs(prop)

const centerW = computed(()=>{
  return size.value.x1 + size.value.width/2
})
const centerH = computed(()=>{
  return size.value.y1 + size.value.height/2
})


</script>

<template>
  <g v-if="size.width>40">   
    <path :d="`M ${size.x1} ${size.y1-5} L ${size.x1} ${size.y1-20}`"></path>
    <path :d="`M ${size.x2} ${size.y1-5} L ${size.x2} ${size.y1-20}`"></path>
    <g>
      <path class="dash" :d="`M ${centerW-20} ${size.y1-12} L ${size.x1+1} ${size.y1-12}`"></path>
      <path class="dash" :d="`M ${centerW+20} ${size.y1-12} L ${size.x2-1} ${size.y1-12}`"></path>
    </g>
    <!-- <polyline :points="`${centerW-30} ${size.y1-20} ${centerW-20} ${size.y1-12} ${centerW-30} ${size.y1-5}`"/>
    <polyline :points="`${centerW+30} ${size.y1-20} ${centerW+20} ${size.y1-12} ${centerW+30} ${size.y1-5}`"/> -->
    <!-- <rect 
      :x="centerW-20"
      :y="size.y1-20"
      :width="40"
      :height="15"
      class="dash"
    ></rect> -->

    <text :x="centerW" :y="size.y1-7" dx="0">{{ size.width }}</text>
  </g>
  <g v-if="size.height>40">   
    <path :d="`M ${size.x1-5} ${size.y1} L ${size.x1-20} ${size.y1}`"></path>
    <path :d="`M ${size.x1-5} ${size.y2} L ${size.x1-20} ${size.y2}`"></path>
    <g>
      <path class="dash" :d="`M ${size.x1-12} ${centerH-20} L ${size.x1-12} ${size.y1+1}`"></path>
      <path class="dash" :d="`M ${size.x1-12} ${centerH+20} L ${size.x1-12} ${size.y2-1}`"></path>
    </g>

    <!-- <text :x="centerW" :y="size.y1-7" dx="0">{{ size.width }}</text> -->
  </g>
</template>

<style lang="scss">
  g{
    stroke: rgba($color: #1979ff, $alpha: 1);
    stroke-width: 1;
    fill: none
  }
  path{stroke-width: 1;}
  .dash{
    stroke-dasharray: 3,2;
  }
  rect{
    stroke-width: 1;
  }
  text{
    text-anchor: middle;
    stroke: none;
    // font-size: 12px;
    fill: rgba($color: #ffffff, $alpha: 1);
  }
  polyline{
    stroke-linecap: butt;
    stroke-linejoin: miter;
    stroke-width: 1;
  }
</style>