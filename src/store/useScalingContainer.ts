import { defineStore } from "pinia";
import { ref } from "vue";
import ScalingArray from "../moks/ScalingArray";

export const useScalingContainer = defineStore('ScalingContainer', ()=>{

  const scaling = ref(ScalingArray[4])
  const sArrSet = (s: number)=>{
    scaling.value = ScalingArray[s]
  }
  return {sArrSet, scaling}
})


