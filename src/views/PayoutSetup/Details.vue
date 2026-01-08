<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <div>
          <h1 class="text-4xl text-black/75 text-opacity-75 font-medium">
            test
          </h1>
        </div>
        <p class="text-base text-gray-400">
          Edit this Payout Template here. Change how incentives are earned and
          calculated by changing the values in the tables below.
        </p>
      </div>
    </div>
    <div
      class="flex justify-between h-[166px] items-center gap-6 border-2 rounded-2xl border-black/5 p-8"
    >
      <div class="flex gap-6 w-3/5">
        <BaseInput
          label="Payout Template name *"
          placeholder="Enter a Branch Code"
          required
        />

        <BaseInput
          label="Brancehs"
          placeholder="Select one or more Job Titles"
          type="select"
          required
        />
      </div>
    </div>
    <div
      class="flex flex-col justify-between h-[166px]  gap-6 border-2 rounded-2xl border-black/5 p-8"
    >
    <div>
      <Tab :tabs="tabs" />
    </div>
    <div class="flex flex-col gap-1">
        <div>
          <h1 class="text-lg text-black/75 text-opacity-75 font-medium">
            CATEGORIES
          </h1>
        </div>
        <p class="text-base text-black/75">
            These are all the categories for which incentives are being calculated. Retails are the base unit, 
            and it can be adjusted as needed for calculator instance.
        </p>
      </div>

</div>
  </div>
</template>

<script setup lang="ts">
import Tab from "../../components/UI/CompanyTab/Tab.vue";
import BaseInput from "../../components/UI/Inputs/BaseInput.vue";
const tabs = [
  { label: "Test", to: "/" },
];
</script>
