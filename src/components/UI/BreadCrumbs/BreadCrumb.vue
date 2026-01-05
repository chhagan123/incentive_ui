<template>
    <nav class="text-sm text-gray-400">
      <ol class="flex items-center ">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center"
        >
        
          <RouterLink
            v-if="item.to && index !== items.length - 1"
            :to="item.to"
             class="ms-1 max-sm:text-[10px] text-sm font-medium text-gray-400 text-opacity-50  text-opacity-40 uppercase leading-[18px] tracking-wider"
          >
            {{ item.label }}
          </RouterLink>
  
          <span
            v-else
          class="ms-1 max-sm:text-[10px] text-sm font-medium text-gray-400 text-opacity-40 uppercase leading-[18px] tracking-wider"
          >
            {{ item.label }}
          </span>
  
          <!-- Separator -->
          <span v-if="index !== items.length - 1" class="mx-2">
            >
          </span>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
    
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  });
  console.log('items',props.items)
  </script>
  