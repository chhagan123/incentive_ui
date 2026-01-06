<template>
  <div class="flex flex-col gap-6 ">
    <div>
      <h1 class="text-4xl text-black/75 text-opacity-75 font-medium">
        Company setup
      </h1>
    </div>
    <p class="text-base text-gray-400">
      To start using Incentive Engine, first set up your company. Add a branch,
      add positions, and create a payout template
    </p>
    <div
      class="mt-4 bg-black/5 p-4 rounded-lg w-70 items-center flex justify-center"
    >
      <ActionWithIcon :icon=" DownloadIcon" text="Download company setup" />
    </div>
    <div>
      <Tab :tabs="tabs" />
    </div>

    <RouterView />
  </div>
</template>
<script setup lang="ts">
import Tab from "@/components/UI/CompanyTab/Tab.vue";
import ActionWithIcon from "../../components/UI/Buttons/ActionWithIcon.vue";
import DownloadIcon from "../../assets/icons/Download/DownloadIcon.vue";


const tabs = [
  { label: "Branches", to: "/company-setup/branches" },
  { label: "Positions", to: "/company-setup/positions" },
  { label: "Payout Templates", to: "/company-setup/payout-templates" },
];
</script>