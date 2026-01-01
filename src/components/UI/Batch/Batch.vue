<template>
  <div
    :style="{ backgroundColor: `var(${props.bgColor})` }"
    class="inline-flex flex-wrap items-center justify-center px-2.5 py-[3px] rounded-md gap-1 min-w-[60px] max-w-full sm:px-3 sm:py-1.5 sm:min-w-[70px] break-words text-center"
  >
    <div
      :style="{ color: `var(${props.textColor})` }"
      class="text-[10px] md:text-xs font-medium leading-tight tracking-wide text-center break-words"
    >
      {{ props.text }}
    </div>
    <IconCrossPrimary
      v-if="props.cross"
      @click="props.crossFn"
      class="w-2 h-2 md:w-3.5 md:h-3.5 cursor-pointer flex-shrink-0"
    />
  </div>
</template>

<script setup lang="ts">
import IconCrossPrimary from '../../../assets/icons/IconCross/Primary.vue'

export interface Props {
  text: string
  cross?: boolean
  crossFn?: Function
  bgColor: string
  textColor: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Lorem',
  cross: false,
  bgColor: '--color-primary-light', // Fallback color
  textColor: '--color-primary'
})
</script>
