import { defineStore } from "pinia";
import { reactive } from "vue";
import ViewBox from "../models/ViewBox";

export const useViewBox = defineStore('ViewBox', ()=>{

  const viewBox = reactive(new ViewBox())
  const viewBoxSet= (v: ViewBox)=>{
    Object.assign(viewBox, v)
  }
  return {viewBoxSet, viewBox}
})


