<template>
    <div ref="wrapper" class="w-full">
      <!-- Label -->
      <label
        v-if="label"
        class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
      >
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
  
      <div
        class="relative w-full"
        :class="{ 'opacity-50 pointer-events-none': disabled }"
      >
        <!-- Input -->
        <input
          :placeholder="placeholder"
          :value="modelValue"
          readonly
          role="combobox"
          aria-haspopup="listbox"
          :aria-expanded="isOpen"
          @click="toggleDropdown"
          @keydown.esc="closeDropdown"
          class="w-full h-[44px] rounded-lg border border-gray-200 px-4 pr-10
                 text-sm text-gray-700 placeholder-gray-400 cursor-pointer
                 focus:outline-none focus:ring-1 focus:ring-[#CF6768]"
        />
  
        <!-- Icons -->
        <Down
          v-if="!isOpen"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"
          @click.stop="toggleDropdown"
        />
        <Up
          v-else
          class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"
          @click.stop="toggleDropdown"
        />
  
        <!-- Dropdown -->
        <ul
          v-if="isOpen"
          role="listbox"
          class="absolute z-20 w-full bg-white border border-gray-200 mt-1
                 rounded shadow max-h-60 overflow-auto"
        >
          <!-- Empty state -->
          <li
            v-if="!options.length"
            class="px-4 py-2 text-gray-400 cursor-not-allowed"
          >
            No options available
          </li>
  
          <li
            v-for="option in options"
            :key="option"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="selectOption(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue"
  import Down from "../../../assets/icons/Chevron/Down.vue"
  import Up from "../../../assets/icons/Chevron/Up.vue"
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: "Select option"
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(["update:modelValue"])
  
  const isOpen = ref(false)
  const wrapper = ref(null)
  
  const toggleDropdown = () => {
    if (props.disabled || !props.options.length) return
    isOpen.value = !isOpen.value
  }
  
  const closeDropdown = () => {
    isOpen.value = false
  }
  
  const selectOption = (option) => {
    emit("update:modelValue", option)
    closeDropdown()
  }
  
  // Close on outside click
  const handleClickOutside = (e) => {
    if (wrapper.value && !wrapper.value.contains(e.target)) {
      closeDropdown()
    }
  }
  
  onMounted(() => {
    document.addEventListener("click", handleClickOutside)
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside)
  })
  </script>
  