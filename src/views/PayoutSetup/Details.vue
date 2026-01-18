<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-4xl text-black/75 font-medium">
          {{ setupstore.singleTempData?.name || "" }}
        </h1>
        <p class="text-base text-gray-400">
          Edit this Payout Template here. Change how incentives are earned and
          calculated by changing the values in the tables below.
        </p>
      </div>
    </div>

    <!-- TEMPLATE INFO -->
    <div
      class="flex justify-between h-[166px] items-center gap-6 border-2 rounded-2xl border-black/5 p-8"
    >
      <div class="flex gap-6 w-3/5">
        <!-- READONLY INPUT -->
        <BaseInput
          :modelValue="setupstore.singleTempData?.name || ''"
          label="Payout Template Name"
          :disabled="true"
        />

        <!-- BRANCH SELECT -->
        <CustomSelect
          v-model="branches"
          label="Branches"
          placeholder="Select branches"
          type="select"
          required
        />
      </div>
    </div>

    <!-- TABS + TABLE -->
    <div
      class="flex flex-col gap-6 border-2 rounded-2xl border-black/5 p-8"
    >
      <Tab
        mode="local"
        :tabs="tabs"
        :activeTab="activeTab"
        @change="activeTab = $event"
      />

      <div class="flex flex-col gap-1">
        <h1 class="text-lg font-bold text-black/75">CATEGORIES</h1>
        <p class="text-base text-black/75">
          These are all the categories for which incentives are being calculated.
        </p>
      </div>

      <div class="border-3 border-black/10 rounded-xl">
        <BaseTable :rowData="rowData" :columnDefs="columnDefs" />
      </div>

      <div
        class="border border-dotted border-black/75 p-5 h-20 rounded-xl
               flex items-center justify-center gap-2 cursor-pointer"
      >
        <div
          class="bg-red-300 hover:bg-red-400 w-9 h-9 rounded-xl
                 flex items-center justify-center"
        >
          <component :is="PlusIcon" />
        </div>
        <span class="text-xl font-bold text-black/75">
          Create new category
        </span>
      </div>

      <div class="flex flex-col gap-1">
        <h1 class="text-lg font-bold text-black/75">
          POSITION PAYOUT SPLITS
        </h1>
        <p class="text-base text-black/75">
          These are the positions which will get incentive according to payout
          split percentage.
        </p>
      </div>

      <div class="border-3 border-black/10 rounded-xl">
        <BaseTable :rowData="posData" :columnDefs="posCOl" />
      </div>

      <div
        class="bg-[#CF6768] hover:bg-red-400 w-55 h-10 rounded-sm
               flex items-center justify-center text-white cursor-pointer"
      >
        <ActionWithIcon
          :isrighticon="false"
          :icon="RightArrow"
          text="Update Position Split"
        />
      </div>
    </div>

    <!-- SAVE -->
    <div
      class="bg-[#CF6768] hover:bg-red-400 w-45 h-10 rounded-sm
             flex items-center justify-center text-white cursor-pointer"
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
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSetupStore } from "../../stores/setup";

import Tab from "../../components/UI/CompanyTab/Tab.vue";
import BaseInput from "../../components/UI/Inputs/BaseInput.vue";
import CustomSelect from "../../components/UI/Inputs/CustomSelect.vue";
import BaseTable from "../../components/UI/Tables/BaseTable.vue";
import ActionWithIcon from "../../components/UI/Buttons/ActionWithIcon.vue";
import PlusIcon from "../../assets/icons/Plus/PlusIcon.vue";
import RightArrow from "../../assets/icons/Arrow/RightArrow.vue";

const router = useRouter();
const route = useRoute();
const setupstore = useSetupStore();

const tabs = ref<any[]>([]);
const activeTab = ref<string>("");
const branches = ref<string[]>([]);

const rowData = ref([
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
  { label: "Incentive", field: "incentive" },
  { label: "Target", field: "target" },
  { label: "Calc", field: "calc" },
  { label: "Type", field: "type" },
  { label: "Related to", field: "related_to" },
];

const posData = ref([{ position: "exce", payout_split: "100%" }]);
const posCOl = ref([
  { label: "Position", field: "position" },
  { label: "Payout Split %", field: "payout_split" },
]);

/*FETCH TEMPLATE BY ROUTE ID */
watch(
  () => route.params.id,
  async (id) => {
    if (!id) return;
    await setupstore.fetchSingleTemp(id as string);
  },
  { immediate: true }
);

/* REACT TO STORE DATA (REFRESH SAFE) */
watch(
  () => setupstore.singleTempData,
  (data) => {
    if (!data) return;

    tabs.value =
      data.branches?.map((b: any) => ({
        label: b.code,
        value: b.code,
      })) || [];

    if (tabs.value.length > 0) {
      activeTab.value = tabs.value[0].value;
    }

    branches.value = data.branches?.map((b: any) => b.code) || [];
  },
  { immediate: true }
);
</script>
