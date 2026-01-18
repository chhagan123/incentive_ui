<template>
    <div class="border-b border-gray-200">
      <nav class="flex gap-8">
        <RouterLink
          v-if="mode === 'router'"
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="relative pb-3 text-md font-bold"
        
          :class="isRouterActive(tab) ? activeClass : inactiveClass"
          
        >
          {{ tab.label }}
          <span
            v-if="isRouterActive(tab)"
            class="absolute left-0 -bottom-[1px] h-[2px] w-full bg-[#CF6768]"
          />
        </RouterLink>
        <!-- LOCAL MODE -->
        <button
          v-else
          v-for="tab in tabs"
          :key="tab.key || tab.value"
          class="relative pb-3 text-md font-bold cursor-pointer"
          :class="isLocalActive(tab) ? activeClass : inactiveClass"
          @click="$emit('change', tab.value)"
        >
          {{ tab.label }}
  
          <span
            v-if="isLocalActive(tab)"
            class="absolute left-0 -bottom-[1px] h-[2px] w-full bg-[#CF6768]"
          />
        </button>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const props = defineProps({
    tabs: { type: Array, required: true },
    mode: { type: String, default: 'router' }, // 'router' | 'local'
    activeTab: { type: [String, Number], default: null },
  })
  
  defineEmits(['change'])
  
  const route = useRoute()
  
  const activeClass = 'text-[#CF6768]'
  const inactiveClass = 'text-[#000000BF]'
  
  const isRouterActive = (tab) => {
    if (tab.to) {
      return route.path === tab.to
    }
    return false
  }
  
  const isLocalActive = (tab) => {
    return props.activeTab === tab.value
  }
  </script>
  