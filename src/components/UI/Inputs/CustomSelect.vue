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
      <!-- Select Box -->
      <div
        class="w-full min-h-[44px] rounded-lg border border-gray-200 px-3 pr-10
               flex items-center gap-2 flex-wrap cursor-pointer text-sm
               focus:outline-none focus:ring-1 focus:ring-[#CF6768]"
        :class="disabled ? 'bg-black/5 cursor-not-allowed text-red-600' : ''"
        @click="toggleDropdown"
      >
        <!-- Selected items -->
        <template v-if="modelValue.length">
          <span
            v-for="option in modelValue"
            :key="option"
            class="flex items-center gap-1 bg-red-100 text-red-600
                   px-2 py-1 rounded-md text-xs"
          >
            {{ option }}
            <span
              class="cursor-pointer hover:text-red-800"
              @click.stop="removeOption(option)"
            >
              ✕
            </span>
          </span>
        </template>

        <!-- Placeholder -->
        <span v-else class="text-gray-400">
          {{ placeholder }}
        </span>
      </div>

      <!-- Arrow -->
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
        <li
          v-if="!options.length"
          class="px-4 py-2 text-gray-400 cursor-not-allowed"
        >
          No options available
        </li>

        <li
          v-for="option in options"
          :key="option"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer
                 flex items-center justify-between"
          @click="toggleOption(option)"
        >
          {{ option }}
          <span v-if="modelValue.includes(option)">✔</span>
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
    modelValue: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: "Select option" },
    label: { type: String, default: "" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  })
  
  const emit = defineEmits(["update:modelValue"])
  
  const isOpen = ref(false)
  const wrapper = ref(null)
  
  const toggleDropdown = () => {
    if (props.disabled || !props.options.length) return
    isOpen.value = !isOpen.value
  }
  
  const toggleOption = (option) => {
    if (props.modelValue.includes(option)) {
      emit(
        "update:modelValue",
        props.modelValue.filter(item => item !== option)
      )
    } else {
      emit(
        "update:modelValue",
        [...props.modelValue, option]
      )
    }
  }
  
  const removeOption = (option) => {
    emit(
      "update:modelValue",
      props.modelValue.filter(item => item !== option)
    )
  }
  
  const handleClickOutside = (e) => {
    if (wrapper.value && !wrapper.value.contains(e.target)) {
      isOpen.value = false
    }
  }
  
  onMounted(() => {
    document.addEventListener("click", handleClickOutside)
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside)
  })
  </script>
  