<template>
  <div class="flex items-center justify-center rounded-2xl gap-2">
    <!-- Left loader or icon -->
    <template v-if="isrighticon">
      <Vue3Lottie
        v-if="loading"
        :animationData="loadWhite"
        :height="25"
        :width="25"
      />
      <component
        v-else
        :is="icon"
        class="w-6 h-6 text-gray-400"
      />
    </template>

    <!-- Button text -->
    <button
      @click="handleClick"
      class="font-medium text-nowrap"
      :disabled="loading"
    >
      {{ text }}
    </button>

    <!-- Right loader or icon -->
    <template v-if="!isrighticon">
      <Vue3Lottie
        v-if="loading"
        :animationData="loadWhite"
        :height="25"
        :width="25"
      />
      <component
        v-else
        :is="icon"
        class="w-6 h-6 text-gray-400"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import loadWhite from '@/assets/jsons/loadWhite.json'

defineProps({
  text: { type: String, default: 'Download' },
  icon: { type: [Object, Function, String], default: null },
  isrighticon: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!loading) emit('click')
}
</script>
