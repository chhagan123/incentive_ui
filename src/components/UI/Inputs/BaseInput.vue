<template>
  <div class="w-full">
    <!-- Label -->
    <label
      class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Input / Select -->
    <div class="relative">
      <!-- Normal Input -->
      <input
        v-if="type !== 'select'"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue($event?.target?.value)"
        class="w-full h-[44px] rounded-lg border border-gray-200 px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CF6768]"
      />

      <!-- Select (UI only for now) -->
      <input
        v-else
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue($event?.target?.value)"
        class="w-full h-[44px] rounded-lg border border-gray-200 px-4 pr-10 text-sm text-gray-700 placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#CF6768]"
      />
      <Down
      v-if="type == 'select' && isOpen != true"
    class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 cursor-pointer"
    @click.stop="Opendrop()"
    />
   <Up v-if=" type == 'select' && isOpen"
        class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"
       @click.stop="Opendrop()"
    />
  <!-- Dropdown menu -->
  <ul
    v-if="isOpen"
    class="absolute z-20 w-full bg-white border border-gray-200 mt-1 rounded shadow max-h-60 overflow-auto"
  >
    <li
      v-for="(option) in options"
      class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      @click="selectOption(option)"
    >
      {{ option }}
    </li>
  </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Down from "../../../assets/icons/Chevron/Down.vue";
import { ref } from "vue";
import Up from "../../../assets/icons/Chevron/Up.vue";
const isOpen = ref(false);


/* PROPS */
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array as PropType<string[]>,
    default: () => ["exce"],
  },
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  required: Boolean,
});


const Opendrop = () => {
  isOpen.value = !isOpen.value;
};
const selectOption = (value: string) => {
  emit("update:modelValue", value);
  isOpen.value = false; // close dropdown
};

const emit = defineEmits(["update:modelValue"]);
const updateValue = (value: string) => {
  emit("update:modelValue", value);
};
</script>
