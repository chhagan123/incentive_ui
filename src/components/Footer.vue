<template>
    <footer class="w-full bg-slate-900 text-gray-300 px-10 py-4">
      <div class="max-w-7xl md-auto lg:mx-25 flex flex-col sm:flex-row items-center justify-between ">
        
        <!-- Left -->
        <div class="flex items-center gap-2 text-sm">
          <span class="font-semibold">SalesRaja</span>
          <span class="opacity-60">|</span>
          <span>Copyright © 2023 - {{ currentYear }} All rights reserved.</span>
        </div>
  
        <!-- Right -->
        <div class="text-sm text-center sm:text-right">
          <div>
            Built with <span class="text-orange-500">🔥</span> by
            <span class="font-semibold"> Mutant(X)</span>
          </div>
          <div class="text-xs opacity-70">
            App Version {{ appVersion }}
          </div>
        </div>
  
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  const currentYear = new Date().getFullYear()
  const appVersion = '2.0'
  </script>
  