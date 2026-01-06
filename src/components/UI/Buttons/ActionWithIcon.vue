<template>
    <div class="flex items-center rounded-2xl">  
      <component :is="icon" class="w-6 h-6 text-gray-400 mr-2" />
      <button @click="handleClick" class="font-medium text-nowrap ">
        {{ text }}
      </button>
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
  });
  
  const emit = defineEmits(["click"]);
  
  const handleClick = () => {
    emit("click");
  };
  </script>
  