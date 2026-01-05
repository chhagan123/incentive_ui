<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <!-- Main Content -->
    <main class="flex-1">
    
      <div class="max-w-7xl mx-auto px-4 py-8"> 
        <div class="flex flex-col gap-4">
          <BreadCrumb :items="breadcrumbItems"/>
          <RouterView />
        </div>      
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import BreadCrumb from "./components/UI/BreadCrumbs/BreadCrumb.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute()

const breadcrumbItems = computed(() => {
  return route.matched
    .filter(r => r.meta?.breadcrumb)
    .map((r, index, arr) => ({
      label: r.meta.breadcrumb,
      to: index !== arr.length - 1 ? r.path : null
    }))
})

</script>

<style scoped>

</style>
