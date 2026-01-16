<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-6 ">
      <div class="flex flex-col gap-2">
        <div>
        <h1 class="text-4xl text-black/75 text-opacity-75 font-medium">
            Create a new payout template
        </h1>
      </div>
      <p class="text-base text-gray-400">
        How are incentives split between employee positions? Add a new Payout Template for incentive calculations here
      </p>
      </div>
    </div>
    <div
        class="flex justify-between h-[166px] items-center gap-6 border-2 rounded-2xl border-black/5 p-8"
      >
       
        <div class="flex gap-6 w-3/5">
          <BaseInput
            v-model="tempName"
            label="Payout Template name *"
            placeholder="Enter a Branch Code"
            required
          />
  
          <CustomSelect
            v-model="branchCode"
            label="Branches"
            placeholder="Select one or more Job Titles"
            :options="setupStore.branchesData.map((da: any) => da.code)"
            required
          />
        </div>
      </div>
      <div
          class="bg-[#CF6768] hover:bg-red-400 w-40 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3 cursor-pointer"  
          @click="createTemp"      
        >
          <ActionWithIcon :isrighticon="false" :icon="RightArrow" text="Save & Next" :loading="setupStore.loading" />
        </div>
  </div>
    
  </template>

  <script setup lang="ts">
    import PlusIcon from '../../assets/icons/Plus/PlusIcon.vue';
    import BaseInput from '../../components/UI/Inputs/BaseInput.vue';
    import ActionWithIcon from '../../components/UI/Buttons/ActionWithIcon.vue';
    import RightArrow from '../../assets/icons/Arrow/RightArrow.vue';
    import { useRouter } from 'vue-router';
    import { useSetupStore } from '../../stores/setup';
    import CustomSelect from '../../components/UI/Inputs/CustomSelect.vue';
    import { onMounted, ref } from 'vue';
    const route = useRouter()
    const setupStore = useSetupStore()
    const branchCode = ref<any>([])
    const tempName  = ref<any>('')  

  
   const createTemp = async () => {
    if (!tempName.value?.trim()) {
    alert("template Name is required");
    return;
  }

  if (!branchCode.value?.length) {
    alert("Please select at least one branch");
    return;
  }
    const payload = {
    name: tempName.value,
    branches: branchCode.value
      .map((selectedName:any) => {
        const match = setupStore.branchesData.find(
          (pos:any) => pos.code.trim() === selectedName.trim()
        );
        return match ? match.id : null;
      })
      .filter(Boolean), // remove any unmatched names
  };

    const data = await setupStore.addPayoutTemp(payload)
    if(data.status == 200){
      alert('created succesfully')
      route.push('/company-setup/payout-templates/details')

    }else{
      alert('error')
    }
   }

   onMounted(() => {
    setupStore.fetchPositions()
    setupStore.fetchBranches()
   })
  </script>