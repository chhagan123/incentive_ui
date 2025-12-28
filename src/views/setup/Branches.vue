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
        <FormInput
          label="Branch Code"
          placeholder="Enter a Branch Code"
          required
        />

        <FormInput
          label="Job Titles"
          placeholder="Select one or more Job Titles"
          type="select"
          required
        />
      </div>

      <div
        class="bg-[#CF6768] w-40 h-10 rounded-sm flex items-center justify-center text-white text-md mt-3"
      >
        <Actionwithicon :icon="Plus" text="Create Branch" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Arrow from "../../assets/icons/Arrow/Arrow.vue";
import FormInput from "@/components/UI/Input/FromInput.vue";
import Actionwithicon from "@/components/UI/ActionWithicon/index.vue";
import Plus from "../../assets/icons/Plus/Plus.vue";
</script>
