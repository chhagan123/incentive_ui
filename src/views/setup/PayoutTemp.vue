<template>
    <div class="w-full h-full flex flex-col justify-start gap-8">
      <div class="flex flex-col gap-1">
        <div class="text-md font-bold text-[#000000BF]">PAYOUT TEMPLATES</div>
        <div>
            Payout Templates are the breakup of how each employee earns incentives through Sales.
             Here is where you can add and view Payout Templates for different branches.
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
        class="flex justify-between h-[140px] w-1/3 items-center gap-6 border-2 rounded-2xl border-black/5 p-8"
      >
       
        <div class="flex flex-col gap-2 w-3/5">
         <div class="text-xl font-bold text-black/75 text-nowrap">Add New Payout Template</div>
         <div class="text-nowrap text-gray-700">Click the '+' button to get started</div>  
        </div>
  
        <div
          class="bg-[#CF6768] w-10 h-10 rounded-xl flex items-center justify-center text-white text-md mt-3"
        >
          <plus/>
        </div>
      </div>
      <div class="gap-2 flex items-center">
        <div
          class="bg-black/10 rounded-lg w-8 h-8 items-center justify-center flex"
        >
          <Arrow class="w-6 h-6" />
        </div>
        <div class="text-xl font-bold text-[#000000BF]">Payout template</div>
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
  import IconEye from  "../../assets/icons/IconEye/Black.vue";
  import {ref} from 'vue' 

  const rowData = ref<any[]>([
   { code: 'Test', position: 'exec', created_at: 'November 24, 2025' },
   { code: 'team', position: 'exec', created_at: 'November 24, 2025' }
  ])


 const columnDefs = [
  { label: 'Name', field: 'position', headerIcon: { component: IconJob } },
  { label: 'Branches', field: 'code', headerIcon: { component: IconCode } },
  { label: 'Created at', field: 'created_at', headerIcon: { component: IconClock } },
  {label: 'Delete',field: 'delete',
    headerIcon: { component: IconDelete },
    cellIcon: { component: IconDelete }
  },
  {label: 'View',field: 'view',
    headerIcon: { component: IconEye },
    cellIcon: { component: IconEye }
  },
 ]

  </script>
  