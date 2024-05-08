<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import RRect from '../models/RRect';
import SvgSizeHelp from './SvgSizeHelp.vue';
import SizeHelp from '../models/SizeHelp';
import {dCreator} from '../service/helper';

const prop = defineProps<{ rect: RRect }>()
const {rect} = toRefs(prop)

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

const d = computed(()=>{
  return  rect.value.width>20 && rect.value.height>20 ? dCreator(rect.value) + dCreator(rect.value, 10) : dCreator(rect.value)
})

</script>

<template>
  <SvgSizeHelp :size="Sizeh" />  
  <path
    :d="d"
    fill="url(#wall-pattern)"
  />   

</template>

<style lang="scss" scoped>
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
  // fill: rgba($color: #fff, $alpha: 0.1);
  stroke: rgba($color: #fff, $alpha: 0.5);
  // stroke-width: 1;
  paint-order: stroke;
}
</style>