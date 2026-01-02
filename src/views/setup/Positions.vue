<template>
    <div class="w-full h-full flex flex-col justify-start gap-8">
      <div class="flex flex-col gap-1">
        <div class="text-md font-bold text-[#000000BF]">POSITIONS</div>
        <div>
            Add and edit Positions in each Branch. You’ll use these in your payout templates.
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
          <FormInput
            label="Positions Name"
            placeholder="Enter a Positions Name"
            required
          />
  
        </div>
  
        <div
          class="bg-[#CF6768] w-40 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3"
        >
          <Actionwithicon :icon="Plus" text="Create Branch" />
        </div>
      </div>
      <div class="gap-2 flex items-center">
        <div
          class="bg-black/10 rounded-lg w-8 h-8 items-center justify-center flex"
        >
          <Arrow class="w-6 h-6" />
        </div>
        <div class="text-xl font-bold text-[#000000BF]">Positions</div>
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
          <Actionwithicon :icon="SearchIcon" text="Search" />
        </div>
      </div>

      <div class="border-3 border-black/10 h-70  rounded-xl">
      <Table :rowData="rowData" :columnDefs="columnDefs" />
    </div>  
      
    </div>
  </template>
  
  <script setup lang="ts">
  import Arrow from "../../assets/icons/Arrow/Arrow.vue";
  import FormInput from "@/components/UI/Input/FromInput.vue";
  import Actionwithicon from "@/components/UI/ActionWithicon/index.vue";
  import Plus from "../../assets/icons/Plus/Plus.vue";
  import SearchIcon from "../../assets/icons/Search/SearchIcon.vue";
  import Table from "../../components/UI/Tables/Table.vue";
  import IconCode from "../../assets/icons/IconCode.vue";
  import IconDelete from "../../assets/icons/IconDelete.vue";
  import IconJob from "../../assets/icons/IconJob.vue";
  import IconClock from "../../assets/icons/Black.vue";
  import {ref} from 'vue'

const rowData = ref<any[]>([
  { code: 'Test', position: 'exec', created_at: 'November 24, 2025' },
  { code: 'team', position: 'exec', created_at: 'November 24, 2025' }
])


const columnDefs = [
{ label: 'Name', field: 'position', headerIcon: { component: IconJob } },
{ label: 'branches', field: 'code', headerIcon: { component: IconCode } },
{ label: 'created at', field: 'created_at', headerIcon: { component: IconClock } },
{
    label: 'Delete',
    field: 'delete',
    headerIcon: { component: IconDelete },
    cellIcon: { component: IconDelete }
  },
]

  </script>
  