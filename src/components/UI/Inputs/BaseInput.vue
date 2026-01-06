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
        v-if="type === 'select'"
        class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 text-black/75 pointer-events-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Down from "../../../assets/icons/Chevron/Down.vue";

/* PROPS */
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const updateValue = (value: string) => {
  emit("update:modelValue", value);
};
</script>
