<template>
    <div class="w-full">
      <!-- Label -->
      <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
        <span v-if="info" class="ml-1 text-gray-400">(i)</span>
      </label>
  
      <!-- Input / Select -->
      <div class="relative">
        <input
          v-if="type !== 'select'"
          :type="type"
          :placeholder="placeholder"
          class="w-full h-[44px] rounded-lg border border-gray-200 px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CF6768]"
        />
  
        <!-- Select (UI only) -->
        <input
          v-else
          type="text"
          :placeholder="placeholder"
          readonly
          class="w-full h-[44px] rounded-lg border border-gray-200 px-4 pr-10 text-sm text-gray-700 placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#CF6768]"
        />
  
        <!-- Dropdown Icon -->
        <span
          v-if="type === 'select'"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          ⌄
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    required: Boolean,
    info: {
      type: Boolean,
      default: true,
    },
  });
  </script>
  