<template>
  
 <ConfirmDeleteModal
    :visible="deleteModal"
    :onCancel="
      () => {
        deleteModal = false;
      }
    "
    :onConfirm="
      () => {
        deleteBranch(rowId);
      }
    "
    :loading="setupStore.deleteloading"
    />

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
            v-model="branchCode"
            label="Branch Code"
            placeholder="Enter a Branch Code"
            required
          />
          <CustomSelect
            v-model="jobTitle"
            label="Job Titles"
            placeholder="Select one or more Job Titles"
           :options="setupStore.positionsData.map((da: any) => da.name)"
            required
          />
          
        </div>
  
        <div
          class="bg-[#CF6768] hover:bg-red-400 w-40 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3 cursor-pointer"
          @click="createBranch"
        >
          <ActionWithIcon :icon="Plus" text="Create Branch" :loading="setupStore.loading"/>
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
      <BaseTable :rowData="setupStore.branchesData" :columnDefs="columnDefs" @update-row="editBranchName" />
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
  import {onMounted, ref, watch} from 'vue'
  import CodeIcon from "../../assets/icons/Code/CodeIcon.vue";
  import JobIcon from "../../assets/icons/Job/JobIcon.vue";
  import ClockIcon from "../../assets/icons/Clock/ClockIcon.vue";
  import DeleteIcon from "../../assets/icons/Delete/DeleteIcon.vue";
  import { useSetupStore } from "../../stores/setup";
  import CustomSelect from "../../components/UI/Inputs/CustomSelect.vue";
  import  ConfirmDeleteModal from "../../components/UI/Modal/DeleteConfirmMod.vue";
  import Postions from "./Postions.vue";
  const setupStore = useSetupStore()

  const branchCode = ref('')
  const jobTitle = ref([])
  const deleteModal = ref(false)
  const rowId = ref(null)

  const rowData = ref<any[]>([
  { code: 'test', position: 'exec', created_at: 'November 24, 2025' },
  { code: 'team', position: 'exec', created_at: 'November 24, 2025' }
])

const columnDefs = [
{ label: 'Code', field: 'code', headerIcon: { component: CodeIcon },enableediting: true },
{ label: 'Postion', 
 field: 'positions',
 valueGetter: (row:any) => {
  return row.positions
    ?.map((pos:any) => pos.name)
    .join(', ') || '-'
},
 headerIcon: { component: JobIcon } },
{ label: 'Created at', field: 'created_at', headerIcon: { component: ClockIcon } },
{label: 'Delete',field: 'delete',
    headerIcon: { component: DeleteIcon },
    cellIcon: { 
      component: DeleteIcon,
      onClick:(row:any) => {
        deleteModal.value = true
         rowId.value = row.id
      } 
    }
  },
]

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

//create branch
const createBranch = async () => {
  // validate required fields
  if (!branchCode.value?.trim()) {
    alert("Branch code is required");
    return;
  }

  if (!jobTitle.value?.length) {
    alert("Please select at least one position");
    return;
  }

  
  // map selected names to IDs
  const payload = {
    code: branchCode.value.trim(),
    positions: jobTitle.value
      .map((selectedName) => {
        const match = setupStore.positionsData.find(
          (pos) => pos.name.trim() === selectedName.trim()
        );
        return match ? match.id : null;
      })
      .filter(Boolean), // remove any unmatched names
  };

  console.log("Payload:", payload);

  // send API request
  const res = await setupStore.addBranches(payload);

  if (res.status === 201) {
    alert("Branch Successfully created");
    setupStore.fetchBranches(); // refresh branch list
  }

  // reset form
  branchCode.value = "";
  jobTitle.value = [];
};

//delete Branch

const deleteBranch = async(rowDataId:any) => {
    setupStore.deleteloading = true
  try {
    await setupStore.removeBranches(rowDataId)
  } catch (error) {
    console.log('error',error)
  }finally{
    setupStore.deleteloading = false
    deleteModal.value = false
  }

}

// edit row branch name
const editBranchName =  async({ row, field, value }) => {

  const payload: any = {
    positions: row.positions.map((pos:any) => pos.id)
  }
  payload[field] = value 
  // send API request to update
  const res = await setupStore.updateBranch(row.id, payload)
  // update UI after success
  if(res.id == row.id){
    row[field] = value
    alert("Branch updatedd successfully")
    setupStore.fetchBranches()
  }
}

onMounted(() => {
  setupStore.fetchPositions()
  setupStore.fetchBranches()
})
  </script>