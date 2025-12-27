<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <Navbar />
  
    <div class="max-w-7xl mx-auto px-4 py-4">
      <RouterView />
    </div>
  </template>

<style scoped>

</style>
