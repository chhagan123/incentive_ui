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
          class="bg-[#CF6768] hover:bg-red-400 w-40 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3 cursor-pointer"        
        >
          <ActionWithIcon :isrighticon="false" :icon="RightArrow" text="Save & Next" />
        </div>
  </div>
    
  </template>

  <script setup lang="ts">
    import PlusIcon from '../../assets/icons/Plus/PlusIcon.vue';
    import BaseInput from '../../components/UI/Inputs/BaseInput.vue';
    import ActionWithIcon from '../../components/UI/Buttons/ActionWithIcon.vue';
    import RightArrow from '../../assets/icons/Arrow/RightArrow.vue';


  </script>