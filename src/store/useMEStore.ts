import { useMouseInElement } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMEStore = defineStore('mouseElement', ()=>{

  const target = ref(null)

  const MEInint = (t: any)=>{
    target.value = t
    console.log(target.value);
  }
  const {sourceType, x, y, elementX, elementY, isOutside, elementPositionX, elementPositionY, elementWidth, elementHeight } = useMouseInElement(target)

  return {MEInint,sourceType, x, y, elementX, elementY, isOutside, elementPositionX, elementPositionY, elementWidth, elementHeight}
})


