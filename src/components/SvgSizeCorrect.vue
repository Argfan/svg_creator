<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import RRect from '../models/RRect';
import { useVModels } from '@vueuse/core';


// const prop = defineModel<{modelValue: RRect}>()

const props = defineProps<{

  rect: RRect,

}>()
// const emit = defineEmits<{ (e: 'update:rect', rect: RRect): void}>()

const {rect} = props

const curX = ref()



const hMove = ()=>{
  // props.rect.x1=rect.x1-10
}

const mDown=()=>{
  
}
const mUp=()=>{

}

</script>

<template>
  <g>
        <path fill="rgba(0,255,0,0.5)" 
          @click=""
          @mousedown="mDown"
          @mouseup="mUp"
          :d="`
            M ${rect.x1} ${rect.y1}
            h 10
            v ${rect.height}
            h -10
            v ${-rect.height}
            z
          `"
        />
      </g>
</template>

<style lang="scss" scoped>
  path{
    cursor: col-resize;
  }
</style>