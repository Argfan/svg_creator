<script setup lang="ts">
import { computed} from 'vue';
import { creat_rect } from '../service/helper';

const props = defineProps<{dd: {x: number, y: number, w: number, h: number, c_type: string}}>()
const emit = defineEmits<{ (e: 'sc_h1_move', a: boolean): void}>()
const d = computed(()=>{
  return creat_rect(props.dd.x, props.dd.y, props.dd.w, props.dd.h)
})
</script>

<template>
  <g>
    <path
      :style="{'cursor': props.dd.c_type}"
      @mousedown="$emit('sc_h1_move', true)"
      @mouseup="$emit('sc_h1_move', false)"
      :d="d"
    />
  </g>
</template>

<style lang="scss" scoped>
  path{
    fill: rgb(0, 192, 0);
    fill-opacity: 0;
    &:hover{ fill-opacity: 0.5}    
  }
</style>