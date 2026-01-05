<template>
    <div class="border-b border-gray-200">
      <nav class="flex gap-8">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="relative pb-3 text-md font-bold"
          :class="
            isActive(tab.to)
              ? 'text-[#CF6768]'
              : 'text-[#000000BF]'
          "
        >
          {{ tab.label }}
          <span
            v-if="isActive(tab.to)"
            class="absolute left-0 -bottom-[1px] h-[2px] w-full bg-[#CF6768]"
          />
        </RouterLink>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  
  defineProps({
    tabs: {
      type: Array,
      required: true,
    },
  });
  
  const route = useRoute();
  const isActive = (path) => route.path.startsWith(path);
  </script>
  