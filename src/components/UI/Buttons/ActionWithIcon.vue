<template>
    <div class="flex items-center justify-center rounded-2xl gap-2">  
      <component v-if="isrighticon" :is="icon" class="w-6 h-6 text-gray-400" />
      <button @click="handleClick" class="font-medium text-nowrap ">
        {{ text }}
      </button>
      <component v-if="!isrighticon" :is="icon" class="w-6 h-6 text-gray-400" />
    </div>   
  </template>
  
  <script setup>
import { defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    text: {
      type: String,
      default: "Download",
    },
    icon: {
      type: [Object, Function, String],
      default: "downloadIcon", // you can pass your icon component
    },
    isrighticon:{
      type:Boolean,
      default:true
    }
  });
  
  const emit = defineEmits(["click"]);
  
  const handleClick = () => {
    emit("click");
  };
  </script>
  