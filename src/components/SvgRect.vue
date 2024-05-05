<script setup lang="ts">
import { computed } from 'vue';
import RRect from '../models/RRect';
import SvgSizeHelp from './SvgSizeHelp.vue';
import SizeHelp from '../models/SizeHelp';

const { rect } = defineProps<{ rect: RRect }>()

const Sizeh = computed(() => {
  return {
    x1: rect.x1,
    x2: rect.x2,
    y1: rect.y1,
    y2: rect.y2,
    width: rect.width,
    height: rect.height,
  } as SizeHelp
})
</script>

<template>
  <SvgSizeHelp :size="Sizeh" />
  <rect class="rrect" :x="rect.x1" :y="rect.y1" :width="rect.width" :height="rect.height" :rx="rect.rx"></rect>
</template>

<style lang="scss">
g {
  stroke: rgba($color: #1979ff, $alpha: 1);
  stroke-width: 1;

}

.dash {
  stroke-dasharray: 3, 3;
}

text {
  text-anchor: middle;
  stroke: none;
  fill: rgba($color: #ffffff, $alpha: 1);
}

.rrect {
  fill: rgba($color: #fff, $alpha: 0.1);
  stroke: rgba($color: #fff, $alpha: 0.5);
  stroke-width: 1
}
</style>