
<template>
    <div v-if="routeId" class="mb-4">
      <div class="inline-flex items-center gap-2 rounded-md bg-green-100 px-4 py-2">
        <span class="text-sm font-semibold text-gray-700">ID –</span>
        <span class="text-sm font-bold text-gray-600 uppercase">{{ routeId }}</span>
      </div>
    </div>
  </template>


<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    
    const route = useRoute()
    
    const routeId = computed(() =>{
          const id = route.params.id as string | undefined
         return id ? id.slice(-4).toUpperCase() : ''
    })
    </script>
    
    
    