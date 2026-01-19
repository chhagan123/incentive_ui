<template>
  <Modal :visible="isModalOpen" @close="isModalOpen = false">
    <template #default>
      <h2 class="text-lg font-semibold mb-4">Create Category</h2>

      <form @submit.prevent="createCategory" class="space-y-4">
        <div class="flex flex-col gap-4">
          <div>
            <BaseInput
              v-model="formValue.categoryName"
              label="CATERGORY NAME"
              type="text"
              placeholder="Enter Category Name"
              class="w-full"
              required
            />
          </div>

          <div>
            <BaseInput
              v-model.number="formValue.incentiveAmount"
              label="INCENTIVE AMOUNT"
              type="number"
              placeholder="Enter Incentive"
              class="w-full"
              required
            />
          </div>
          <div>
            <CustomSelect
              v-model="formValue.type"
              label="Type"
              type="select"
              placeholder="select Type"
              :multiple="false"
              :options="['money', 'percentage']"
              class="w-full"
              required
            />
          </div>
          <div>
            <BaseInput
              v-model.number="formValue.calc"
              label="calc"
              type="number"
              placeholder="Enter Incentive"
              class="w-full"
              required
            />
          </div>
          <div>
            <CustomSelect
              v-model="formValue.relationType"
              label="Relation Type"
              type="select"
              placeholder="select Type"
              :multiple="false"
              :options="['retail', 'retail archeved', 'other category']"
              class="w-full"
              required
            />
          </div>
        </div>

        <div class="flex gap-2 mt-4">
          <button
            type="button"
            class="px-4 py-2 border border-gray-200 rounded w-1/2"
            @click="isModalOpen = false"
          >
            Cancel
          </button>
          <!-- <button
          type="submit"
          class="px-4 py-2 bg-red-400 text-white rounded w-1/2"
        >
          Create Category
        </button> -->
          <div
            type="submit"
            class="bg-[#CF6768] hover:bg-red-400 w-1/2 h-10 rounded-sm flex items-center justify-center text-white cursor-pointer"
          >
            <ActionWithIcon
              :isrighticon="false"
              :loading="setupstore.loading"
              text="create Category"
            />
          </div>
        </div>
      </form>
    </template>
  </Modal>>

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
          :disabled="true"
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
        <BaseTable :rowData="selectedStructure?.categories" :columnDefs="columnDefs" />
      </div>

      <div
        class="border border-dotted border-black/75 p-5 h-20 rounded-xl
               flex items-center justify-center gap-2 cursor-pointer"
      >
        <div
          class="bg-red-300 hover:bg-red-400 w-9 h-9 rounded-xl
                 flex items-center justify-center"
                  @click="isModalOpen = !isModalOpen"
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
        <BaseTable :rowData="selectedPostions.positions" :columnDefs="posCOl" />
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
import { ref, watch,computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSetupStore } from "../../stores/setup";
import Modal from "../../components/UI/Modal/Modal.vue";

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
const isModalOpen = ref(false);
const tabs = ref<any[]>([]);
const activeTab = ref<any>(null);
const branches = ref<string[]>([]);
const formValue = ref({
  categoryName: "",
  incentiveAmount: 0,
  type: "",
  calc: 0,
  relationType: "",
});

const createCategory = async () => {
  if (!formValue.value.categoryName.trim() ) {
    alert("Category Name is required");
    return;
  }
  if (formValue.value.incentiveAmount <= 0) {
    alert("Incentive Amount must be greater than zero");
    return;
  }
  if (!formValue.value.type.trim()) {
    alert("Type is required");
    return;
  }
  if (formValue.value.calc <= 0) {
    alert("Calc must be greater than zero");
    return;
  }

  setupstore.loading = true;
  const templateId = route.params.id as string;

  const payload = {
    branch_id: activeTab.value.id,
    name: formValue.value.categoryName,
    incentive_qty: formValue.value.incentiveAmount,
    type: formValue.value.type,
    calc_qty: formValue.value.calc,
    relation_type: formValue.value.relationType,
  };

  try {
    const res = await setupstore.addPayoutCategory(templateId, payload);
    console.log("Create category response:", res);
    isModalOpen.value = false;
    if(res.status == 201){
      await setupstore.fetchSingleTemp(templateId);
      alert("Category created successfully!");
    }else{
      alert("Failed to create category.");
    }

    // reset form
    formValue.value = {
      categoryName: "",
      incentiveAmount: 0,
      type: "",
      calc: 0,
      relationType: "",
    };
  } catch (err) {
    console.error("Create category failed:", err);
  }
};
const columnDefs = [
  { label: "Name", field: "name" },
  { label: "Incentive", field: "incentive_qty" },
  { label: "Target", field: "target_qty" },
  { label: "Calc", field: "calc_qty" },
  { label: "Type", field: "type" },
  { label: "Related to", field: "relation_type" },
];

const posCOl = ref([
  { label: "Position", field: "name" },
  { label: "Payout Split %",
    field: "payout_split",
    valueGetter: (raw) => {
    return selectedStructure?.value?.position_splits?.[raw.id] ?? "-"
  }
   },
]);

// dynnamic branches tab data render for payout template
const selectedStructure = computed(() => {
  return (
    setupstore.singleTempData?.structures
      ?.find(structure => structure.branch_id === activeTab.value?.id) || null
  )
})

const selectedPostions = computed(() => {
  return (
    setupstore.singleTempData?.branches
      ?.find(branch => branch.code === activeTab.value?.value) || null
  )
})


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
        id:b.id
      })) || [];

    if (tabs.value.length > 0) {
      activeTab.value = tabs.value[0];
    }

    branches.value = data.branches?.map((b: any) => b.code) || [];
  },
  { immediate: true }
);

</script>
