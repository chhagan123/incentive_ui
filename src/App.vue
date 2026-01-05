<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <!-- Main Content -->
    <main class="flex-1">
      <div class="max-w-7xl border-3 border-amber-100 mx-auto px-4 py-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

</script>

<style scoped>

</style>
