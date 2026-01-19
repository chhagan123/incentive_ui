
<template>
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
        <!-- Close Button -->
        <button
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          @click="$emit('close')"
        >
          ✕
        </button>
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    visible: { type: Boolean, default: false },
  })
  const emit = defineEmits(["close"])
  </script>
  