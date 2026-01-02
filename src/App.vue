
<template>
    <Navbar class="sticky z-50 top-0"/>
  
    <div class="min-h-[calc(100vh-64px)]">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="mt-4 ml-4">
        <BreadCRumb :items="breadcrumbItems"/>
      </div>
  
        <RouterView />
      </div>
    </div>
  
    <Footer />
  </template>
  

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
import BreadCRumb from '@/components/UI/BreadCrumb/index.vue';
import { computed } from "vue";
import { useRoute } from "vue-router";
import Footer from './components/UI/Footer.vue';

const route = useRoute();

const breadcrumbItems = computed(() =>
  route.matched
    .filter(r => r.meta?.breadcrumb)
    .map((r, index, arr) => ({
      label: r.meta.breadcrumb,
      to: index !== arr.length - 1 ? r.path : null,
    })))
</script>