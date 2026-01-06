<template>
    <div class="w-full h-full flex flex-col justify-start gap-8">
      <div class="flex flex-col gap-1">
        <div class="text-md font-bold text-[#000000BF]">BRANCHES</div>
        <div>
          Add Branches and manage branch details like Teams and Positions from
          here
        </div>
      </div>
      <div class="gap-2 flex items-center">
        <div
          class="bg-black/10 rounded-lg w-8 h-8 items-center justify-center flex"
        >
          <Arrow class="w-6 h-6" />
        </div>
        <div class="text-xl font-bold text-[#000000BF]">Actions</div>
      </div>
      <div
        class="flex justify-between h-[166px] items-center gap-6 border-2 rounded-2xl border-black/5 p-8"
      >
       
        <div class="flex gap-6 w-3/5">
          <BaseInput
            label="Branch Code"
            placeholder="Enter a Branch Code"
            required
          />
  
          <BaseInput
            label="Job Titles"
            placeholder="Select one or more Job Titles"
            type="select"
            required
          />
        </div>
  
        <div
          class="bg-[#CF6768] hover:bg-red-400 w-40 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3 cursor-pointer"
        >
          <ActionWithIcon :icon="Plus" text="Create Branch" />
        </div>
      </div>
      <div class="gap-2 flex items-center">
        <div
          class="bg-black/10 rounded-lg w-8 h-8 items-center justify-center flex"
        >
          <Arrow class="w-6 h-6" />
        </div>
        <div class="text-xl font-bold text-[#000000BF]">Branches</div>
      </div>
      <div class="flex gap-2">
        <input
            type="text"
            placeholder="What are you looking for?"
  
            class="w-full h-[44px] rounded-lg border border-gray-200 px-4 pr-10 text-sm text-gray-700 placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#CF6768]"
          />
          <div
          class="bg-[#CF6768] w-30 h-10 rounded-sm flex items-center justify-center text-white text-md "
        >
          <ActionWithIcon :icon="SearchIcon" text="Search" />
        </div>
      </div>  
      <div class="border-3 border-black/10 h-70  rounded-xl">
      <BaseTable :rowData="rowData" :columnDefs="columnDefs" />
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Arrow from "../../assets/icons/Arrow/ArrowIcon.vue";
  import BaseInput from "../../components/UI/Inputs/BaseInput.vue";
  import ActionWithIcon from "../../components/UI/Buttons/ActionWithIcon.vue";
  import Plus from "../../assets/icons/Plus/PlusIcon.vue";
  import SearchIcon from "../../assets/icons/Search/SearchIcon.vue";
  import BaseTable from "../../components/UI/Tables/BaseTable.vue";
  import {ref} from 'vue'
  import CodeIcon from "../../assets/icons/Code/CodeIcon.vue";
  import JobIcon from "../../assets/icons/Job/JobIcon.vue";
  import ClockIcon from "../../assets/icons/Clock/ClockIcon.vue";
  import DeleteIcon from "../../assets/icons/Delete/DeleteIcon.vue";

  const rowData = ref<any[]>([
  { code: 'test', position: 'exec', created_at: 'November 24, 2025' },
  { code: 'team', position: 'exec', created_at: 'November 24, 2025' }
])


const columnDefs = [
{ label: 'Code', field: 'code', headerIcon: { component: CodeIcon } },
{ label: 'Postion', field: 'position', headerIcon: { component: JobIcon } },
{ label: 'Created at', field: 'created_at', headerIcon: { component: ClockIcon } },
{label: 'Delete',field: 'delete',
    headerIcon: { component: DeleteIcon },
    cellIcon: { component: DeleteIcon }
  },
]
  </script>