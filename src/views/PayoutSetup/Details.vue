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
      class="flex flex-col justify-between gap-6 border-2 rounded-2xl border-black/5 p-8"
    >
      <div>
        <Tab :tabs="tabs" />
      </div>
      <div class="flex flex-col gap-1">
        <div>
          <h1 class="text-lg text-black/75 font-bold text-opacity-75">
            CATEGORIES
          </h1>
        </div>
        <p class="text-base text-black/75">
          These are all the categories for which incentives are being
          calculated. Retails are the base unit, and it can be adjusted as
          needed for calculator instance.
        </p>
      </div>
      <div class="border-3 border-black/10 rounded-xl">
        <BaseTable :rowData="rowData" :columnDefs="columnDefs" />
      </div>
      <div
        class="border border-dotted border-black/75 w-auto p-5 h-20 rounded-xl flex items-center justify-center text-xl gap-2"
      >
        <div
          class="bg-red-300 hover:bg-red-400 w-9 h-9 rounded-xl flex items-center justify-center text-md cursor-pointer"
        >
          <component :is="PlusIcon" />
        </div>
        <div class="text-black/75 text-xl font-bold">Create new category</div>
      </div>
      <div class="flex flex-col gap-1">
        <div>
          <h1 class="text-lg text-black/75 font-bold text-opacity-75">
            POSITION PAYOUT SPLITS
          </h1>
        </div>
        <p class="text-base text-black/75">
          These are the positions which will get incentive according to payout
          split percentage.
        </p>
      </div>
      <div class="border-3 border-black/10 rounded-xl">
        <BaseTable :rowData="posData" :columnDefs="posCOl" />
      </div>
      <div
        class="bg-[#CF6768] hover:bg-red-400 w-55 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3 cursor-pointer"
      >
        <ActionWithIcon
          :isrighticon="false"
          :icon="RightArrow"
          text="Update Postion Split"
        />
      </div>
    </div>
    <div
      class="bg-[#CF6768] hover:bg-red-400 w-45 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3 cursor-pointer"
      @click="router.push('/company-setup/payout-templates')"
    >
      <ActionWithIcon
        :isrighticon="false"
        :icon="RightArrow"
        text="Save & Next"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tab from "../../components/UI/CompanyTab/Tab.vue";
import BaseInput from "../../components/UI/Inputs/BaseInput.vue";
import PlusIcon from "../../assets/icons/Plus/PlusIcon.vue";
import BaseTable from "../../components/UI/Tables/BaseTable.vue";
import { ref } from "vue";
import ActionWithIcon from "../../components/UI/Buttons/ActionWithIcon.vue";
import RightArrow from "../../assets/icons/Arrow/RightArrow.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const tabs = [
  { label: "Test", to: "/company-setup/payout-templates/details" },
  { label: "Test temp", to: "/company-setup/payout-templates/detailss" },
];

const rowData = ref<any[]>([
  {
    name: "test",
    incentive: "100",
    target: "11",
    calc: "fixed number",
    type: "unit",
    related_to: "Branch Target",
  },
  {
    name: "test",
    incentive: "100",
    target: "11",
    calc: "fixed number",
    type: "unit",
    related_to: "Branch Target",
  },
]);

const columnDefs = [
  { label: "Name", field: "name" },
  { label: "incentive", field: "incentive" },
  { label: "Target", field: "target" },
  { label: "Calc", field: "calc" },
  { label: "Type", field: "type" },
  { label: "Related to", field: "related_to" },
];

const posData = ref<any[]>([{ position: "exce", payout_split: "100%" }]);

const posCOl = ref<any[]>([
  { label: "Postion", field: "position" },
  { label: "Payout Split %", field: "payout_split" },
]);
</script>
