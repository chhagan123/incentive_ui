
<template>
    <Teleport to="body">
      <div
        v-if="visible"
       class="fixed z-[9999] bg-white text-black text-xs py-2 px-2 rounded-sm shadow-md max-w-xl "
        :style="{ top: y + 'px', left: x + 'px' }"
        v-html="text"
      >
      </div>
    </Teleport>
  </template>
  
  <script setup>
  defineProps({
    visible: Boolean,
    text: String,
    x: Number,
    y: Number,
  })
  </script>
  