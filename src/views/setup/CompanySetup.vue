<template>

    <div class="flex flex-col gap-6 p-4">
        <div>
            <h1 class="text-4xl text-black/75 text-opacity-75 font-medium">Company setup</h1>
        </div>
        <p class="text-base text-gray-400">To start using Incentive Engine, first set up your company. Add a branch, add positions, and create a payout template</p>
        <div class="mt-4 bg-black/5 p-4 rounded-md w-70 items-center flex  justify-center">
            <ActionWithicon :icon="downloadIcon" text="Download company setup" />
        </div> 
        <div>
            <Tab :tabs="tabs" />
        </div>   
    </div>

</template>
<script setup lang="ts">
    import BreadCrumb from '@/components/UI/BreadCrumb/index.vue';
    import downloadIcon from '../../assets/icons/download/downloadIcon.vue';
    import ActionWithicon from '@/components/UI/ActionWithicon/index.vue';
    import Tab from '@/components/UI/CompanySetupTabs/tab.vue';

    const tabs = [
  { label: "Branches", to: "/company-setup/branch" },
  { label: "Positions", to: "/company-setup/position" },
  { label: "Payout Templates", to: "/company-setup/payout-template" },
];
</script>