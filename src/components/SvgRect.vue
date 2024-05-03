<script setup lang="ts">

import RRect from '../models/RRect';

const props = defineProps<{
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}>()



</script>

<template>
  <rect class="" ref="" :x="props.x1" :y="props.y1" :width="props.x2 - props.x1" :height="props.y2 - props.y1"
    style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);">
  </rect>
</template>

<style lang="scss"></style>